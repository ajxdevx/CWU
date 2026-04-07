import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

const WATERMARK_PHRASE = 'Where communities become economies'

const watermarkTextClass =
  "inline-block shrink-0 whitespace-nowrap pr-14 font-cwu-serif text-[clamp(2.25rem,8vw,120px)] mobile:text-[64px] mobile:pr-6 font-normal leading-[1.2] tracking-[-1px] text-[#D2D8DB] sm:pr-20 lg:pr-28"

/**
 * Infinite horizontal marquee: distance is measured in px (one phrase width) so iOS/Safari
 * don’t mis-resolve %-based transforms on flex/max-content tracks.
 */
export default function CwuWatermarkMarquee() {
  const firstPhraseRef = useRef<HTMLSpanElement>(null)
  const [shiftPx, setShiftPx] = useState(0)

  useLayoutEffect(() => {
    const phrase = firstPhraseRef.current
    if (!phrase) return

    const measure = () => {
      const w = phrase.offsetWidth
      if (w > 0) setShiftPx(w)
    }

    measure()

    const ro = new ResizeObserver(() => {
      measure()
    })
    ro.observe(phrase)

    window.addEventListener('orientationchange', measure)
    window.addEventListener('resize', measure)

    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="cwu-watermark-marquee-viewport pointer-events-none absolute left-0 right-0 top-0 z-0 flex h-[322px] flex-col justify-center overflow-x-hidden overflow-y-visible py-6 mobile:h-[200px] mobile:py-3 sm:py-8 lg:py-8"
    >
      <div
        className="cwu-watermark-marquee-track flex w-max flex-nowrap pl-4 mobile:pl-2 sm:pl-6 lg:pl-10 min-[1800px]:pl-8"
        style={
          {
            '--cwu-marquee-shift': `${shiftPx}px`,
          } as CSSProperties & { '--cwu-marquee-shift': string }
        }
      >
        <span ref={firstPhraseRef} className={watermarkTextClass}>
          {WATERMARK_PHRASE}
        </span>
        <span className={watermarkTextClass}>{WATERMARK_PHRASE}</span>
      </div>
    </div>
  )
}
