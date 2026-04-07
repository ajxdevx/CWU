import { useLayoutEffect, useRef, useState } from 'react'
import { publicImages, publicVideo } from '@/content/assetPaths'

function getDesktopVideoIntroEnabled(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(min-width: 1275px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function HeroFoldBackground() {
  const [desktopVideoIntro, setDesktopVideoIntro] = useState(getDesktopVideoIntroEnabled)
  const videoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    const sync = () => {
      setDesktopVideoIntro(getDesktopVideoIntroEnabled())
    }
    sync()
    const mq = window.matchMedia('(min-width: 1275px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener('change', sync)
    rm.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      rm.removeEventListener('change', sync)
    }
  }, [])

  useLayoutEffect(() => {
    if (!desktopVideoIntro) return
    const el = videoRef.current
    if (!el) return
    el.setAttribute('fetchpriority', 'high')
    const tryPlay = () => {
      void el.play().catch(() => {})
    }
    tryPlay()
    el.addEventListener('loadeddata', tryPlay)
    el.addEventListener('canplay', tryPlay)
    return () => {
      el.removeEventListener('loadeddata', tryPlay)
      el.removeEventListener('canplay', tryPlay)
    }
  }, [desktopVideoIntro])

  return (
    <div
      className="hero-fold-graphic pointer-events-none absolute inset-0 z-0 min-h-0 overflow-hidden max-[800px]:overflow-visible"
      aria-hidden
    >
      <div className="hero-fold-graphic-inner relative h-full min-h-0 w-full min-[1275px]:h-full min-[1275px]:min-h-full">
        {desktopVideoIntro ? (
          <video
            ref={videoRef}
            aria-hidden
            className="hero-fold-video-layer pointer-events-none absolute inset-0 z-[5] max-[1274px]:hidden h-full min-h-0 w-full object-cover object-[72%_center] max-h-none min-[1275px]:block min-[1275px]:-translate-x-[3.5%]"
            src={publicVideo.heroFold001}
            muted
            playsInline
            preload="auto"
            autoPlay
          />
        ) : null}
        <picture
          className={`relative z-1 block h-full min-h-0 w-full max-h-full ${desktopVideoIntro ? 'min-[1275px]:hidden' : ''}`}
        >
          <source media="(max-width: 800px)" srcSet={publicImages.heroFoldBgMobile} type="image/svg+xml" />
          <img
            src={publicImages.heroFoldBgDesktop}
            alt=""
            decoding="async"
            fetchPriority={desktopVideoIntro ? 'low' : 'high'}
            className="hero-intro-cover relative z-1 block h-full w-full max-h-full object-contain max-[800px]:object-center max-[1274px]:max-h-full max-[1274px]:w-full min-[801px]:max-[1274px]:object-[50%_60%] min-[1275px]:max-h-none min-[1275px]:min-h-full min-[1275px]:w-full min-[1275px]:object-cover min-[1275px]:object-right"
          />
        </picture>
      </div>
    </div>
  )
}
