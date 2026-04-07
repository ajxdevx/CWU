import { useLayoutEffect, useRef, useState } from 'react'
import { publicImages, publicVideo } from '@/content/assetPaths'

type VideoIntroFlags = { mobile: boolean; desktop: boolean }

function getVideoIntroFlags(): VideoIntroFlags {
  if (typeof window === 'undefined') return { mobile: false, desktop: false }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { mobile: false, desktop: false }
  }
  return {
    mobile: window.matchMedia('(max-width: 800px)').matches,
    /** Same desktop MP4 + styling as wide hero — from tablet up (801px+). */
    desktop: window.matchMedia('(min-width: 801px)').matches,
  }
}

export default function HeroFoldBackground() {
  const [flags, setFlags] = useState<VideoIntroFlags>(getVideoIntroFlags)
  const videoMobileRef = useRef<HTMLVideoElement>(null)
  const videoDesktopRef = useRef<HTMLVideoElement>(null)

  const { mobile: mobileVideoIntro, desktop: desktopVideoIntro } = flags

  useLayoutEffect(() => {
    const sync = () => {
      setFlags(getVideoIntroFlags())
    }
    sync()
    const mqMobile = window.matchMedia('(max-width: 800px)')
    const mqDesktop = window.matchMedia('(min-width: 801px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    mqMobile.addEventListener('change', sync)
    mqDesktop.addEventListener('change', sync)
    rm.addEventListener('change', sync)
    return () => {
      mqMobile.removeEventListener('change', sync)
      mqDesktop.removeEventListener('change', sync)
      rm.removeEventListener('change', sync)
    }
  }, [])

  useLayoutEffect(() => {
    const el = mobileVideoIntro
      ? videoMobileRef.current
      : desktopVideoIntro
        ? videoDesktopRef.current
        : null
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
  }, [mobileVideoIntro, desktopVideoIntro])

  const hidePictureOnMobile = mobileVideoIntro ? 'max-[800px]:hidden' : ''
  const hidePictureOnDesktop = desktopVideoIntro ? 'min-[801px]:hidden' : ''

  return (
    <div
      className="hero-fold-graphic pointer-events-none absolute inset-0 z-0 min-h-0 overflow-hidden max-[800px]:overflow-visible"
      aria-hidden
    >
      <div className="hero-fold-graphic-inner relative h-full min-h-0 w-full min-[801px]:h-full min-[801px]:min-h-full">
        {mobileVideoIntro ? (
          <video
            ref={videoMobileRef}
            aria-hidden
            className="hero-fold-video-layer pointer-events-none absolute inset-0 z-[5] block h-full min-h-0 w-full min-w-0 object-cover object-center max-h-none max-[800px]:min-h-full max-[800px]:w-full min-[801px]:hidden"
            src={publicVideo.heroFoldMobile001}
            muted
            playsInline
            preload="auto"
            autoPlay
          />
        ) : null}
        {desktopVideoIntro ? (
          <video
            ref={videoDesktopRef}
            aria-hidden
            className="hero-fold-video-layer pointer-events-none absolute inset-0 z-[5] hidden h-full min-h-0 w-full object-cover object-[72%_center] max-h-none max-[800px]:hidden min-[801px]:block min-[801px]:-translate-x-[3.5%]"
            src={publicVideo.heroFold001}
            muted
            playsInline
            preload="auto"
            autoPlay
          />
        ) : null}
        <picture
          className={`relative z-1 block h-full min-h-0 w-full max-h-full ${hidePictureOnMobile} ${hidePictureOnDesktop}`}
        >
          <source media="(max-width: 800px)" srcSet={publicImages.heroFoldBgMobile} type="image/svg+xml" />
          <img
            src={publicImages.heroFoldBgDesktop}
            alt=""
            decoding="async"
            fetchPriority={mobileVideoIntro || desktopVideoIntro ? 'low' : 'high'}
            className="hero-intro-cover relative z-1 block h-full w-full max-h-full object-contain max-[800px]:object-center max-[1274px]:max-h-full max-[1274px]:w-full min-[801px]:max-[1274px]:object-[50%_60%] min-[1275px]:max-h-none min-[1275px]:min-h-full min-[1275px]:w-full min-[1275px]:object-cover min-[1275px]:object-right"
          />
        </picture>
      </div>
    </div>
  )
}
