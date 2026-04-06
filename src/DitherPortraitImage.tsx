import { useCallback, useEffect, useRef } from 'react'

/** 8×8 Bayer matrix, normalized weight for ordered dithering (print / OCI-adjacent look). */
const BAYER_8: readonly (readonly number[])[] = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]

type Props = {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
) {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  if (!iw || !ih) return
  const s = Math.max(w / iw, h / ih)
  const dw = iw * s
  const dh = ih * s
  const ox = (w - dw) / 2
  const oy = (h - dh) / 2
  ctx.drawImage(img, 0, 0, iw, ih, ox, oy, dw, dh)
}

function applyOrderedDither(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  levels: number,
  spread: number,
  mouseBias: number,
) {
  const step = 255 / Math.max(1, levels - 1)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const t = (BAYER_8[y % 8]![x % 8]! / 64 - 0.5) * spread + mouseBias
      for (let c = 0; c < 3; c++) {
        const v = data[i + c]!
        const q = v + t
        data[i + c] = Math.min(255, Math.max(0, Math.round(q / step) * step))
      }
    }
  }
}

/** Building-ref style: blue halftone on warm cream (#ebeae1). Blues are lighter lifts of #1d35a6 — no black / pure white. */
const CREAM: { r: number; g: number; b: number } = { r: 235, g: 234, b: 225 } // #ebeae1

const TRICOLOR: readonly { r: number; g: number; b: number }[] = [
  { r: 55, g: 82, b: 210 }, // #3752d2 — shadow blue (lighter than #1d35a6)
  { r: 85, g: 115, b: 235 }, // #5573eb — mid / dense dither blue
  CREAM,
]

function applyTriColorGrade(data: Uint8ClampedArray, _width: number, _height: number) {
  const n = TRICOLOR.length
  for (let p = 0; p < data.length; p += 4) {
    const r0 = data[p]!
    const g0 = data[p + 1]!
    const b0 = data[p + 2]!
    const L = (0.299 * r0 + 0.587 * g0 + 0.114 * b0) / 255
    const tL = Math.min(1, Math.max(0, Math.pow(L, 0.88)))
    const idx = Math.min(n - 1, Math.floor(tL * n))
    const { r, g, b } = TRICOLOR[idx]!
    data[p] = r
    data[p + 1] = g
    data[p + 2] = b
  }
}

/**
 * Portrait: ordered dither, then blue + #ebeae1 posterization (reference halftone look).
 */
export default function DitherPortraitImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const pointerRef = useRef({ x: 0.5, y: 0.5 })
  const scheduleRafRef = useRef<number>(0)
  const ditherCacheRef = useRef<Uint8ClampedArray | null>(null)
  const cacheKeyRef = useRef('')

  const paint = useCallback(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!wrap || !canvas || !img || !img.complete || img.naturalWidth === 0) return

    const rect = wrap.getBoundingClientRect()
    const w = Math.max(1, Math.floor(rect.width))
    const h = Math.max(1, Math.floor(rect.height))
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const px = pointerRef.current.x
    const py = pointerRef.current.y
    const mouseBias = (px - 0.5) * 10 + (py - 0.5) * 10
    const biasKey = Math.round(mouseBias * 4) / 4
    const cacheKey = `${w}|${h}|${src}|${biasKey}`

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const needNewDither =
      cacheKey !== cacheKeyRef.current ||
      !ditherCacheRef.current ||
      ditherCacheRef.current.length !== w * h * 4

    if (needNewDither) {
      canvas.width = w
      canvas.height = h
      ctx.fillStyle = '#ebeae1'
      ctx.fillRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      drawCover(ctx, img, w, h)
      const dithered = ctx.getImageData(0, 0, w, h)
      applyOrderedDither(dithered.data, w, h, 6, 22, mouseBias)
      ditherCacheRef.current = new Uint8ClampedArray(dithered.data)
      cacheKeyRef.current = cacheKey
    }

    const out = ctx.createImageData(w, h)
    out.data.set(ditherCacheRef.current!)
    applyTriColorGrade(out.data, w, h)
    ctx.putImageData(out, 0, 0)
  }, [src])

  const paintRef = useRef(paint)
  paintRef.current = paint

  const schedulePaint = useCallback(() => {
    if (scheduleRafRef.current) return
    scheduleRafRef.current = requestAnimationFrame(() => {
      scheduleRafRef.current = 0
      paintRef.current()
    })
  }, [])

  useEffect(() => {
    ditherCacheRef.current = null
    cacheKeyRef.current = ''
  }, [src])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    let cancelled = false
    const img = new Image()
    if (loading === 'eager') {
      ;(img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 'high'
    }
    img.decoding = 'async'
    img.onload = () => {
      if (cancelled) return
      imgRef.current = img
      ditherCacheRef.current = null
      cacheKeyRef.current = ''
      paintRef.current()
    }
    img.src = src

    const ro = new ResizeObserver(() => schedulePaint())
    ro.observe(wrap)

    return () => {
      cancelled = true
      img.onload = null
      ro.disconnect()
      if (scheduleRafRef.current) cancelAnimationFrame(scheduleRafRef.current)
    }
  }, [src, loading, schedulePaint])

  const onPointerMove = (e: React.PointerEvent) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const r = wrap.getBoundingClientRect()
    pointerRef.current = {
      x: (e.clientX - r.left) / Math.max(1, r.width),
      y: (e.clientY - r.top) / Math.max(1, r.height),
    }
    schedulePaint()
  }

  const onPointerLeave = () => {
    pointerRef.current = { x: 0.5, y: 0.5 }
    schedulePaint()
  }

  return (
    <div
      ref={wrapRef}
      className={`relative h-full min-h-0 w-full overflow-hidden ${className}`.trim()}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className="cwu-dither-canvas h-full w-full object-cover"
      />
    </div>
  )
}
