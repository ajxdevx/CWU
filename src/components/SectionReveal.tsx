import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  surfaceClassName: string
  delayMs?: number
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** SSR / pre-hydration: assume no reduced motion so class list matches first client paint. */
function getReducedMotionServerSnapshot() {
  return false
}

export default function SectionReveal({
  children,
  className = '',
  surfaceClassName,
  delayMs = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return
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
  }, [prefersReducedMotion])

  const motionOn = !prefersReducedMotion
  const revealed = prefersReducedMotion || visible

  const motionClass = !motionOn
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
