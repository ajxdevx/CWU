import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  /**
   * Solid surface behind the fading layer — must match the section’s own background so the fade
   * never flashes the page (body) gradient through a transparent wrapper.
   */
  surfaceClassName: string
  /** Delay (ms) before the reveal transition runs once the section is in view */
  delayMs?: number
}

export default function SectionReveal({
  children,
  className = '',
  surfaceClassName,
  delayMs = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduceMotion !== false) return
    const el = ref.current
    if (!el) return
    const scrollRoot = document.getElementById('root')
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      {
        root: scrollRoot,
        rootMargin: '0px 0px -4% 0px',
        threshold: 0.05,
      },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [reduceMotion])

  const motionOn = reduceMotion === false
  const revealed = reduceMotion === true || visible

  const motionClass =
    reduceMotion === null
      ? ''
      : !motionOn
        ? 'section-reveal section-reveal--visible'
        : revealed
          ? 'section-reveal section-reveal--visible'
          : 'section-reveal'

  const delayStyle: CSSProperties | undefined =
    motionOn && delayMs > 0 ? { ['--section-reveal-delay' as string]: `${delayMs}ms` } : undefined

  return (
    <div className={`w-full min-w-0 ${surfaceClassName}`.trim()}>
      <div ref={ref} className={`${motionClass} ${className}`.trim()} style={delayStyle}>
        {children}
      </div>
    </div>
  )
}
