import { useCallback, useEffect, useRef, useState } from 'react'

type LeaderHalftoneImageProps = {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
}

/**
 * Exactly two colors: #2073A8 (field) and #014778 (squares only).
 * Per-image luma stretch helps darker portraits (e.g. darker skin) keep facial detail, not a solid blob.
 */
const BG = '#2073A8'
const INK = '#014778'

const CELL = 5
const MAX_FILL = 0.96
/** Main tone curve span. */
const TONE_CEILING = 0.9
/** Lower = stronger navy in midtones (helps beard / jaw / folds read clearly). */
const MID_CURVE = 0.5
/** Extra navy in this luminance band (typical face / chin / beard in portraits). */
const FACE_LUMA_MIN = 0.16
const FACE_LUMA_MAX = 0.82
const FACE_INK_BOOST = 0.34
/** Brighter face (above this luma): ease off navy so mid blue reads on skin. */
const FACE_LIGHTEN_START_L = 0.33
const FACE_LIGHTEN_AMOUNT = 0.38
/** From this brightness up, sparse dots on pale cloth only (keep below face boost). */
const LIGHT_GRAIN_START = 0.72
const LIGHT_GRAIN_MAX = 0.17
/** Past this horizontal distance from center (0–1), treat as likely frame / studio background. */
const SIDE_RIM_START = 0.4
/** Pull navy down in dark background beside subject so #2073A8 dominates naturally. */
const BG_SIDE_DARK_SOFT = 0.58
const BG_SIDE_DARK_LUMA = 0.46
/** Same at sides for very bright backdrop / blowout. */
const BG_SIDE_BRIGHT_SOFT = 0.42
const BG_SIDE_BRIGHT_LUMA = 0.7
/** Corner-only extra (dark or bright) for typical vignette corners. */
const CORNER_RIM = 0.72
const CORNER_EXTRA = 0.22

function sampleLuma(data: ImageData, x0: number, y0: number, cw: number, ch: number, w: number): number {
  let sum = 0
  let n = 0
  for (let y = y0; y < y0 + ch && y < data.height; y++) {
    let i = (y * w + x0) * 4
    for (let x = x0; x < x0 + cw && x < data.width; x++) {
      const r = data.data[i]
      const g = data.data[i + 1]
      const b = data.data[i + 2]
      sum += 0.299 * r + 0.587 * g + 0.114 * b
      n++
      i += 4
    }
  }
  return n > 0 ? sum / n / 255 : 1
}

/**
 * Map each photo’s luminance into ~[0,1] using robust percentiles so mid-face contrast survives
 * on darker overall exposures (common with darker skin) without changing edge/BG heuristics.
 */
function computeLumaStretch(data: ImageData, step: number): { low: number; span: number } {
  const d = data.data
  const { width, height } = data
  const bucket: number[] = []
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4
      bucket.push((0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255)
    }
  }
  if (bucket.length === 0) return { low: 0, span: 1 }
  bucket.sort((a, b) => a - b)
  const n = bucket.length
  const iLo = Math.max(0, Math.floor(n * 0.035))
  const iHi = Math.min(n - 1, Math.ceil(n * 0.965) - 1)
  const low = bucket[iLo] ?? 0
  const high = bucket[iHi] ?? 1
  const rawSpan = Math.max(1e-6, high - low)
  const minSpan = 0.11
  if (rawSpan >= minSpan) return { low, span: rawSpan }
  const mid = (low + high) / 2
  return { low: Math.max(0, mid - minSpan / 2), span: minSpan }
}

/** Bell-shaped bump so chin / cheeks / beard (mid luminance) carry more #014778 than flat #2073A8. */
function faceInkBoost(L: number): number {
  if (L < FACE_LUMA_MIN || L > FACE_LUMA_MAX) return 0
  const mid = (FACE_LUMA_MIN + FACE_LUMA_MAX) / 2
  const half = (FACE_LUMA_MAX - FACE_LUMA_MIN) / 2
  const z = (L - mid) / half
  if (z <= -1 || z >= 1) return 0
  return FACE_INK_BOOST * (1 - z * z)
}

/** Softer halftone on lighter skin so #2073A8 is visible; beard / jaw below FACE_LIGHTEN_START_L unchanged. */
function lightenFaceHighlights(L: number, strength: number): number {
  if (L < FACE_LIGHTEN_START_L || L > FACE_LUMA_MAX) return strength
  const u = (L - FACE_LIGHTEN_START_L) / (FACE_LUMA_MAX - FACE_LIGHTEN_START_L)
  return strength * (1 - FACE_LIGHTEN_AMOUNT * u)
}

/** 0 = no ink; 1 = full cell navy. Only BG + INK are ever drawn. */
function inkStrengthFromLuma(L: number): number {
  const span = Math.max(0, (TONE_CEILING - L) / TONE_CEILING)
  let strength = Math.pow(span, MID_CURVE)
  strength = Math.min(1, strength + faceInkBoost(L))
  if (L >= LIGHT_GRAIN_START) {
    const u = (L - LIGHT_GRAIN_START) / (1 - LIGHT_GRAIN_START)
    strength = Math.min(1, strength + LIGHT_GRAIN_MAX * u * u)
  }
  strength = lightenFaceHighlights(L, strength)
  return strength
}

/** More #2073A8 at left/right (and corners) where photos usually have flat dark or bright BG — not center face. */
function softenSideBackground(
  L: number,
  strength: number,
  cx: number,
  cy: number,
  cssW: number,
  cssH: number,
): number {
  const sideRim = Math.abs((cx / cssW) * 2 - 1)
  const nx = Math.abs((cx / cssW) * 2 - 1)
  const ny = Math.abs((cy / cssH) * 2 - 1)
  const cornerRim = Math.max(nx, ny)

  let soft = 0
  if (sideRim > SIDE_RIM_START) {
    const ts = (sideRim - SIDE_RIM_START) / (1 - SIDE_RIM_START)
    if (L < BG_SIDE_DARK_LUMA) {
      const dl = Math.min(1, (BG_SIDE_DARK_LUMA - L) / BG_SIDE_DARK_LUMA)
      soft = Math.max(soft, BG_SIDE_DARK_SOFT * ts * dl)
    }
    if (L > BG_SIDE_BRIGHT_LUMA) {
      const bl = Math.min(1, (L - BG_SIDE_BRIGHT_LUMA) / (1 - BG_SIDE_BRIGHT_LUMA))
      soft = Math.max(soft, BG_SIDE_BRIGHT_SOFT * ts * bl)
    }
  }
  if (cornerRim > CORNER_RIM) {
    const tc = (cornerRim - CORNER_RIM) / (1 - CORNER_RIM)
    if (L < 0.4 || L > 0.74) {
      soft = Math.max(soft, CORNER_EXTRA * tc)
    }
  }

  return strength * Math.max(0.12, 1 - soft)
}

function drawHalftone(canvas: HTMLCanvasElement, img: HTMLImageElement, dpr: number): void {
  const parent = canvas.parentElement
  if (!parent) return

  const rect = parent.getBoundingClientRect()
  const cssW = Math.max(1, Math.floor(rect.width))
  const cssH = Math.max(1, Math.floor(rect.height))

  canvas.width = Math.floor(cssW * dpr)
  canvas.height = Math.floor(cssH * dpr)
  canvas.style.width = `${cssW}px`
  canvas.style.height = `${cssH}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const iw = img.naturalWidth
  const ih = img.naturalHeight
  if (iw < 1 || ih < 1) return

  const off = document.createElement('canvas')
  off.width = cssW
  off.height = cssH
  const octx = off.getContext('2d')
  if (!octx) return
  octx.imageSmoothingEnabled = true
  octx.imageSmoothingQuality = 'high'

  const scale = Math.max(cssW / iw, cssH / ih)
  const sw = cssW / scale
  const sh = cssH / scale
  const sx = (iw - sw) / 2
  const sy = (ih - sh) / 2
  octx.drawImage(img, sx, sy, sw, sh, 0, 0, cssW, cssH)
  const imageData = octx.getImageData(0, 0, cssW, cssH)
  const { low: lumaLow, span: lumaSpan } = computeLumaStretch(imageData, 3)

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, cssW, cssH)
  ctx.fillStyle = INK

  const cols = Math.ceil(cssW / CELL)
  const rows = Math.ceil(cssH / CELL)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x0 = col * CELL
      const y0 = row * CELL
      const cw = Math.min(CELL, cssW - x0)
      const ch = Math.min(CELL, cssH - y0)
      const L_raw = sampleLuma(imageData, x0, y0, cw, ch, cssW)
      const L = Math.min(1, Math.max(0, (L_raw - lumaLow) / lumaSpan))
      const cx = x0 + cw / 2
      const cy = y0 + ch / 2
      let strength = inkStrengthFromLuma(L)
      strength = softenSideBackground(L_raw, strength, cx, cy, cssW, cssH)
      const side = strength * CELL * MAX_FILL
      if (side < 0.12) continue
      const s = Math.min(side, Math.min(cw, ch) * MAX_FILL)
      ctx.fillRect(cx - s / 2, cy - s / 2, s, s)
    }
  }
}

/** Reveal = opacity crossfade only (no scale). */
const halftoneLayerClass = [
  'absolute inset-0 z-0 block h-full w-full opacity-100',
  'transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
  'motion-reduce:duration-150',
  'group-hover:opacity-0 group-focus:opacity-0 group-focus-within:opacity-0',
].join(' ')

const photoRevealClass = [
  'pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover opacity-0',
  'transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
  'motion-reduce:duration-150',
  'group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100',
].join(' ')

/**
 * Blue square-grid halftone portrait for leadership cards. Hover or focus to reveal the photograph.
 */
export default function LeaderHalftoneImage({ src, alt, className, loading = 'lazy' }: LeaderHalftoneImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [bitmapReady, setBitmapReady] = useState(false)

  const redraw = useCallback(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1))
    drawHalftone(canvas, img, dpr)
  }, [])

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const onDone = () => {
      setBitmapReady(true)
      requestAnimationFrame(redraw)
    }

    if (img.complete && img.naturalWidth > 0) onDone()
    else {
      img.addEventListener('load', onDone, { once: true })
      img.addEventListener('error', onDone, { once: true })
    }

    return () => {
      img.removeEventListener('load', onDone)
      img.removeEventListener('error', onDone)
    }
  }, [src, redraw])

  useEffect(() => {
    if (!bitmapReady) return
    const el = wrapRef.current
    if (!el) return

    redraw()
    const ro = new ResizeObserver(() => redraw())
    ro.observe(el)
    window.addEventListener('resize', redraw)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', redraw)
    }
  }, [bitmapReady, redraw])

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      role="group"
      aria-label={`${alt}. Halftone portrait; hover or focus to show photograph.`}
      className={[
        'group relative h-full min-h-0 w-full overflow-hidden rounded-t-[16px] sm:rounded-t-[20px] min-[1660px]:rounded-t-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2073A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ebeae1]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <canvas ref={canvasRef} aria-hidden className={halftoneLayerClass} />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={photoRevealClass}
        width={285}
        height={255}
        loading={loading}
        decoding="async"
      />
    </div>
  )
}
