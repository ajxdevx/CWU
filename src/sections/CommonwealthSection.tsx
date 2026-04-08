import { ArrowRight } from 'lucide-react'
import CwuWatermarkMarquee from '@/components/CwuWatermarkMarquee'
import { publicVideo } from '@/content/assetPaths'

const ABOUT_SECTION_ID = 'about'

const STATS = [
  { value: '56', label: 'Commonwealth nations' },
  { value: '2.6B', label: 'People connected' },
  { value: '$19T+', label: 'Combined GDP' },
  { value: '150M', label: 'SMEs across markets' },
  { value: '12M', label: 'Existing readers' },
] as const

const HEADLINE_DARK = '#0D4A9C'
const HEADLINE_LIGHT = '#227BB3'

/** Body: ≤800 mobile; 801–1274 @container cqi; 1275–1900 fixed (matches Network mid-band); ≥1901 cqi again. */
const aboutBodyClass =
  "m-0 min-w-0 max-w-none text-center min-[801px]:text-left font-['DM_Sans',sans-serif] font-normal tracking-normal text-[#777777] " +
  "max-[800px]:text-[clamp(12px,1.55dvh+0.28rem,15px)] max-[800px]:leading-[1.36] " +
  "min-[801px]:max-[1274px]:[font-size:clamp(0.8125rem,calc(0.55rem+2.1cqi),1.3125rem)] min-[801px]:max-[1274px]:leading-[1.45] " +
  "min-[1275px]:max-[1900px]:text-[14px] min-[1275px]:max-[1900px]:leading-[1.42] " +
  "min-[1901px]:[font-size:clamp(0.8125rem,calc(0.55rem+2.1cqi),1.3125rem)] min-[1901px]:leading-[1.45]"

function GlobeCard() {
  return (
    <div
      className="relative flex min-h-[200px] w-full max-w-[750px] flex-col overflow-hidden rounded-[24px] bg-[#014778] sm:rounded-[28px] aspect-4/3 max-lg:w-full lg:aspect-auto lg:h-full lg:min-h-0 lg:max-w-[min(100%,720px)] lg:w-full lg:flex-1"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 opacity-[0.45]"
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
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 50% 45%, rgba(255,255,255,0.08) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-2 flex min-h-0 w-full flex-1 items-center justify-center">
        <video
          aria-hidden
          className="cwu-tricolor-dither h-full w-full max-h-none min-h-0 object-contain object-center scale-[1.08]"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={publicVideo.globeCommonwealth} type="video/mp4" />
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
        <CwuWatermarkMarquee />

        <div className="relative z-10 flex w-full min-h-0 flex-1 flex-col px-0 pb-10 pt-[calc(322px+1.5rem)] mobile:pt-[calc(200px+1rem)] sm:pb-12 lg:pb-16">
          <div className="grid min-h-0 w-full flex-1 grid-cols-1 content-end items-stretch gap-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-x-8 lg:gap-y-10 xl:gap-x-12 lg:content-stretch lg:items-stretch">
            <div className="flex w-full min-h-0 flex-col items-stretch px-4 sm:px-6 lg:h-full lg:min-h-0 lg:items-end lg:pl-8 lg:pr-2 xl:pl-12">
              <GlobeCard />
            </div>

            <div className="mx-auto flex min-h-0 w-full min-w-0 max-w-2xl flex-col items-stretch gap-5 px-4 pb-1 text-left mobile:text-center sm:gap-6 sm:px-6 lg:mx-0 lg:max-w-none lg:min-w-0 lg:gap-8 lg:px-0 lg:pl-6 lg:pr-10 xl:pl-8 xl:pr-12 lg:text-left">
              <p className="m-0 w-full shrink-0 font-['DM_Sans',sans-serif] text-xl font-semibold leading-[1.2] tracking-[1.8px] text-[#6B7280] sm:text-2xl min-[1275px]:max-[1900px]:text-[1.375rem] min-[1901px]:text-2xl">
                What is Commonwealth Union?
              </p>
              <h2
                id="cwu-about-heading"
                className="m-0 w-full max-w-none shrink-0 font-cwu-serif text-[clamp(1.75rem,4.5vw+0.5rem,4rem)] font-normal leading-[1.1] tracking-[0] min-[900px]:text-[3.25rem] lg:text-[64px] min-[1275px]:max-[1900px]:text-[58px] min-[1275px]:max-[1900px]:leading-[1.08]"
              >
                <span className="block text-balance" style={{ color: HEADLINE_DARK }}>
                  An established global network spanning{' '}
                </span>
                <span className="block text-balance" style={{ color: HEADLINE_LIGHT }}>
                  all 56 nations
                </span>
              </h2>
              <div className="@container mt-6 grid w-full min-w-0 grid-cols-1 gap-x-6 gap-y-6 text-center min-[801px]:mt-8 min-[801px]:text-left md:grid-cols-2 md:gap-x-10 md:gap-y-6 lg:mt-10 lg:gap-x-12 lg:gap-y-8">
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
                <a
                  href="#advisory"
                  className="box-border flex min-h-[64px] min-w-0 flex-1 items-center justify-center rounded-[14.19px] border-[1.42px] border-solid border-white/15 bg-[#014778] px-10 py-5 text-center no-underline transition-[filter,opacity] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#014778] lg:flex-none lg:w-fit"
                >
                  <span className="font-['DM_Sans',sans-serif] text-[15px] font-bold leading-[120%] text-white sm:text-[16px]">
                    Learn more
                  </span>
                </a>
                <a
                  href="#advisory"
                  aria-label="Leadership section"
                  className="box-border flex h-16 w-[64.89px] shrink-0 items-center justify-center rounded-[17.78px] bg-[#2073A8] px-5 py-2 text-white no-underline transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2073A8]"
                >
                  <ArrowRight className="size-5" strokeWidth={2.2} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 w-full shrink-0 flex-col border-t border-[#E6E2D9] bg-white lg:h-[300px] lg:min-h-0">
        <div className="mx-auto grid min-h-0 w-full min-w-0 max-w-[min(1920px,100%)] grid-cols-1 divide-y divide-[#E6E2D9] px-4 py-10 min-[640px]:px-6 min-[768px]:px-10 lg:h-full lg:grid-cols-5 lg:gap-x-0 lg:gap-y-0 lg:content-center lg:divide-x lg:divide-y-0 lg:divide-[#E6E2D9] lg:overflow-x-hidden lg:py-0">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex min-w-0 flex-col items-center justify-center gap-1 px-2 py-1 max-lg:py-8 sm:gap-1.5 lg:flex-1 lg:px-3"
            >
              <p className="m-0 w-full text-center font-cwu-serif text-[clamp(1.6875rem,4vw,56px)] font-normal leading-none tracking-normal text-[#0A1628] mobile:text-[40px] min-[900px]:text-[56px] min-[900px]:leading-[56px]">
                {value}
              </p>
              <p className="m-0 w-full min-w-0 max-w-[225px] text-center font-['DM_Sans',sans-serif] text-[clamp(13px,1.65vw,20px)] font-normal leading-[1.2] tracking-[0.3px] text-[#999999] wrap-anywhere sm:max-w-none">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
