import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const ABOUT_SECTION_ID = 'about'

/** Extra rAF frames after each scroll event (helps momentum / sparse scroll events). */
const GLOBE_SCROLL_SCRUB_BURST_FRAMES = 14

/**
 * Scroll→video progress: t = raw ** EXPO (raw in [0,1]). Expo in (0,1) = faster motion while
 * scrolling (still t=1 only when the section finishes crossing — unlike multiplying raw by 3+).
 * Lower = snappier (e.g. 0.45 aggressive, 0.55 balanced, 0.7 mild).
 */
const GLOBE_SCROLL_SCRUB_EXPO = 0.52

const STATS = [
  { value: '56', label: 'Commonwealth nations' },
  { value: '2.6B', label: 'People connected' },
  { value: '$19T+', label: 'Combined GDP' },
  { value: '150M', label: 'SMEs across markets' },
  { value: '12M', label: 'Existing readers' },
] as const

/** Match Network section headline colors */
const HEADLINE_DARK = '#0D4A9C'
const HEADLINE_LIGHT = '#227BB3'

const WATERMARK_PHRASE = 'Where communities become economies'

const watermarkTextClass =
  "inline-block shrink-0 whitespace-nowrap pr-14 font-cwu-serif text-[clamp(2.25rem,8vw,120px)] mobile:text-[64px] mobile:pr-6 font-normal leading-[1.2] tracking-[-1px] text-[#D2D8DB] sm:pr-20 lg:pr-28"

/** Body copy: Network card mobile size/leading at ≤800px; from 801px uses shared @container (cqi) for both columns. */
const aboutBodyClass =
  "m-0 min-w-0 max-w-none text-center min-[801px]:text-left font-['DM_Sans',sans-serif] font-normal tracking-normal text-[#777777] max-[800px]:text-[clamp(12px,1.55dvh+0.28rem,15px)] max-[800px]:leading-[1.36] min-[801px]:[font-size:clamp(0.8125rem,calc(0.55rem+2.1cqi),1.3125rem)] min-[801px]:leading-[1.45]"

function GlobeCard() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef(0)
  const burstLeftRef = useRef(0)

  /** Scroll-scrub: `#about` vs viewport → `currentTime` (no `play()`). See GLOBE_SCROLL_SCRUB_EXPO. */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const section = document.getElementById(ABOUT_SECTION_ID)
    if (!section) return

    const scrollRoots: (HTMLElement | Window)[] = []
    const rootEl = document.getElementById('root')
    if (rootEl) scrollRoots.push(rootEl)
    scrollRoots.push(window)

    const updateFromScroll = () => {
      const dur = video.duration
      if (!Number.isFinite(dur) || dur <= 0) return

      const r = section.getBoundingClientRect()
      const rootH = window.innerHeight || document.documentElement.clientHeight
      const denom = rootH + r.height
      if (denom <= 0) return

      const raw = Math.min(1, Math.max(0, (rootH - r.top) / denom))
      const t = Math.pow(raw, GLOBE_SCROLL_SCRUB_EXPO)
      video.currentTime = t * dur
    }

    const tick = () => {
      updateFromScroll()
      if (burstLeftRef.current > 0) {
        burstLeftRef.current -= 1
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const onScroll = () => {
      burstLeftRef.current = GLOBE_SCROLL_SCRUB_BURST_FRAMES
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    const onMeta = () => {
      onScroll()
    }

    video.addEventListener('loadedmetadata', onMeta)
    for (const el of scrollRoots) {
      el.addEventListener('scroll', onScroll, { passive: true })
    }
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return () => {
      burstLeftRef.current = 0
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadedmetadata', onMeta)
      for (const el of scrollRoots) {
        el.removeEventListener('scroll', onScroll)
      }
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="relative flex min-h-[200px] w-full max-w-[750px] flex-col overflow-hidden rounded-[24px] bg-[#014778] sm:rounded-[28px] aspect-4/3 max-lg:w-full lg:aspect-auto lg:h-full lg:min-h-0 lg:max-w-[min(100%,720px)] lg:w-full lg:flex-1"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.45]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(255,255,255,0.55) 1px, transparent 1.2px)',
          backgroundSize: '10px 10px',
          maskImage: 'radial-gradient(ellipse 55% 55% at 50% 48%, black 0%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 55% 55% at 50% 48%, black 0%, transparent 72%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 50% 45%, rgba(255,255,255,0.08) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-[2] flex min-h-0 w-full flex-1 items-center justify-center">
        <video
          ref={videoRef}
          aria-hidden
          className="cwu-tricolor-dither h-full w-full max-h-none min-h-0 object-contain object-center scale-[1.08]"
          muted
          playsInline
          preload="auto"
        >
          <source src="/Globe%2002.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default function CommonwealthSection() {
  return (
    <section
      id={ABOUT_SECTION_ID}
      className="flex w-full min-w-0 overflow-x-hidden scroll-mt-28 flex-col bg-[#F7F5F0]"
      aria-labelledby="cwu-about-heading"
    >
      <div className="relative flex min-h-svh min-w-0 flex-col">
        <div
          aria-hidden
          className="cwu-watermark-marquee-viewport pointer-events-none absolute left-0 right-0 top-0 z-0 flex h-[322px] flex-col justify-center overflow-x-hidden overflow-y-visible py-6 mobile:h-[200px] mobile:py-3 sm:py-8 lg:py-8"
        >
          <div className="cwu-watermark-marquee-track pl-4 mobile:pl-2 sm:pl-6 lg:pl-10 min-[1800px]:pl-8">
            <span className={watermarkTextClass}>{WATERMARK_PHRASE}</span>
            <span className={watermarkTextClass}>{WATERMARK_PHRASE}</span>
          </div>
        </div>

        <div className="relative z-10 flex w-full min-h-0 flex-1 flex-col px-0 pb-10 pt-[calc(322px+1.5rem)] mobile:pt-[calc(200px+1rem)] sm:pb-12 lg:pb-16">
          <div className="grid min-h-0 w-full flex-1 grid-cols-1 content-end items-stretch gap-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-x-8 lg:gap-y-10 xl:gap-x-12 lg:content-stretch lg:items-stretch">
            <div className="flex w-full min-h-0 flex-col items-stretch px-4 sm:px-6 lg:h-full lg:min-h-0 lg:items-end lg:pl-8 lg:pr-2 xl:pl-12">
              <GlobeCard />
            </div>

            <div className="mx-auto flex min-h-0 w-full min-w-0 max-w-2xl flex-col items-stretch gap-5 px-4 pb-1 text-left mobile:text-center sm:gap-6 sm:px-6 lg:mx-0 lg:max-w-none lg:min-w-0 lg:gap-8 lg:px-0 lg:pl-6 lg:pr-10 xl:pl-8 xl:pr-12 lg:text-left">
              <p className="m-0 w-full font-['DM_Sans',sans-serif] text-xl font-semibold leading-[1.2] tracking-[1.8px] text-[#6B7280] sm:text-2xl">
                What is Commonwealth Union?
              </p>
              <h2
                id="cwu-about-heading"
                className="m-0 w-full max-w-none font-cwu-serif text-[clamp(1.75rem,4.5vw+0.5rem,4rem)] font-normal leading-[1.1] tracking-[0] min-[900px]:text-[3.25rem] lg:text-[64px]"
              >
                <span className="block text-balance" style={{ color: HEADLINE_DARK }}>
                  An established global network spanning{' '}
                </span>
                <span className="block text-balance" style={{ color: HEADLINE_LIGHT }}>
                  all 56 nations
                </span>
              </h2>
              {/* Shared @container + equal body cols; tighter gap-x leaves more px per column for manual line breaks. */}
              <div className="@container grid w-full min-w-0 grid-cols-1 gap-x-6 gap-y-4 text-center min-[801px]:text-left md:grid-cols-2 md:gap-x-8 md:gap-y-5 lg:gap-x-10">
                {/* Mobile ≤800px: first block includes “represented by…”; second block starts at “It puts…”. */}
                <div className="min-w-0 max-[800px]:block min-[801px]:hidden">
                  <p className={aboutBodyClass}>
                    Commonwealth Union is an established global
                    <br />
                    network with 12 million readers, a $19 trillion
                    <br />
                    GDP footprint, and an International Advisory
                    <br />
                    Board of presidents, prime ministers, and
                    <br />
                    senior statesmen. The CWU token is created
                    <br />
                    by Commonwealth Union Blockchain Network,
                    <br />
                    an official vertical of Commonwealth Union.
                    <br />
                    represented by His Highness Sheikh Saoud bin
                    <br />
                    Faisal Sultan Alqasimi.
                  </p>
                </div>
                <div className="min-w-0 max-[800px]:block min-[801px]:hidden">
                  <p className={aboutBodyClass}>
                    It puts the network on-chain, opening up
                    <br />
                    participation and cross-border commerce.
                    <br />
                    Built for people, not politics.
                  </p>
                </div>
                {/* ≥801px: original two columns (unchanged). */}
                <div className="min-w-0 hidden min-[801px]:block">
                  <p className={aboutBodyClass}>
                    Commonwealth Union is an established global
                    <br />
                    network with 12 million readers, a $19 trillion
                    <br />
                    GDP footprint, and an International Advisory
                    <br />
                    Board of presidents, prime ministers, and
                    <br />
                    senior statesmen. The CWU token is created
                    <br />
                    by Commonwealth Union Blockchain Network,
                    <br />
                    an official vertical of Commonwealth Union.
                  </p>
                </div>
                <div className="min-w-0 hidden min-[801px]:block">
                  <p className={aboutBodyClass}>
                    represented by His Highness Sheikh Saoud bin
                    <br />
                    Faisal Sultan Alqasimi. It puts the network on-
                    <br />
                    chain, opening up participation and cross-
                    <br />
                    border commerce. Built for people, not
                    <br />
                    politics.
                  </p>
                </div>
              </div>
              <div className="mt-2 flex w-full max-w-full flex-nowrap items-stretch justify-start gap-2.5">
                <button
                  type="button"
                  className="box-border flex min-h-[64px] min-w-0 flex-1 items-center justify-center rounded-[14.19px] border-[1.42px] border-solid border-white/15 bg-[#014778] px-10 py-5 text-center transition-[filter,opacity] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#014778] lg:flex-none lg:w-fit"
                >
                  <span className="font-['DM_Sans',sans-serif] text-[15px] font-bold leading-[120%] text-white sm:text-[16px]">
                    Learn more
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Learn more, next"
                  className="box-border flex h-16 w-[64.89px] shrink-0 items-center justify-center rounded-[17.78px] bg-[#2073A8] px-5 py-2 text-white transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2073A8]"
                >
                  <ArrowRight className="size-5" strokeWidth={2.2} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 w-full shrink-0 flex-col border-t border-[#E6E2D9] bg-white lg:h-[300px] lg:min-h-0">
        <div className="mx-auto grid min-h-0 w-full min-w-0 max-w-[min(1920px,100%)] grid-cols-1 divide-y divide-[#E6E2D9] px-4 py-10 sm:px-6 md:px-10 lg:h-full lg:grid-cols-5 lg:gap-x-0 lg:gap-y-0 lg:content-center lg:divide-x lg:divide-y-0 lg:divide-[#E6E2D9] lg:overflow-x-hidden lg:px-10 lg:py-0 min-[1800px]:px-10">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex min-w-0 flex-col items-center justify-center gap-1 px-2 py-1 max-lg:py-8 sm:gap-1.5 lg:flex-1 lg:px-3"
            >
              <p className="m-0 w-full text-center font-cwu-serif text-[clamp(1.6875rem,4vw,56px)] font-normal leading-none tracking-normal text-[#0A1628] mobile:text-[40px] min-[900px]:text-[56px] min-[900px]:leading-[56px]">
                {value}
              </p>
              <p className="m-0 w-full min-w-0 max-w-[225px] text-center font-['DM_Sans',sans-serif] text-[clamp(13px,1.65vw,20px)] font-normal leading-[1.2] tracking-[0.3px] text-[#999999] break-words [overflow-wrap:anywhere] sm:max-w-none">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
