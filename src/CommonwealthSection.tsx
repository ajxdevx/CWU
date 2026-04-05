import { ArrowRight } from 'lucide-react'

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
  "inline-block shrink-0 whitespace-nowrap pr-14 font-[Georgia,serif] text-[clamp(2.25rem,8vw,120px)] font-normal leading-[1.2] tracking-[-1px] text-[#D2D8DB] sm:pr-20 lg:pr-28"

/** Body copy: scales with column width (cqi) so manual line breaks track the same structure across widths */
const aboutBodyClass =
  "m-0 min-w-0 max-w-none text-left font-['DM_Sans',sans-serif] font-normal tracking-normal text-[#777777] leading-[1.45] [font-size:clamp(0.6875rem,calc(0.5rem+2.35cqi),1.25rem)]"

function GlobeCard() {
  return (
    <div className="relative flex min-h-[200px] w-full max-w-[750px] flex-col overflow-hidden rounded-[24px] bg-[#014778] sm:rounded-[28px] aspect-4/3 max-lg:w-full lg:aspect-auto lg:h-full lg:min-h-0 lg:max-w-none lg:w-full lg:flex-1">
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
        <img
          src="/Globe%20Transparent%281%29.png"
          alt=""
          className="h-full w-full max-h-none min-h-0 object-contain object-center scale-[1.08]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}

export default function CommonwealthSection() {
  return (
    <section
      id="about"
      className="flex w-full min-w-0 overflow-x-hidden scroll-mt-28 flex-col bg-[#F7F5F0]"
      aria-labelledby="cwu-about-heading"
    >
      <div className="relative flex min-h-svh min-w-0 flex-col">
        <div
          aria-hidden
          className="cwu-watermark-marquee-viewport pointer-events-none absolute left-0 right-0 top-0 z-0 flex h-[322px] flex-col justify-center overflow-x-hidden overflow-y-visible py-6 sm:py-8 lg:py-8"
        >
          <div className="cwu-watermark-marquee-track pl-4 sm:pl-6 lg:pl-10 min-[1800px]:pl-8">
            <span className={watermarkTextClass}>{WATERMARK_PHRASE}</span>
            <span className={watermarkTextClass}>{WATERMARK_PHRASE}</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1685px] min-h-0 flex-1 flex-col px-4 pb-10 pt-[calc(322px+1.5rem)] sm:px-6 sm:pb-12 lg:px-10 lg:pb-16 min-[1800px]:px-8">
          <div className="grid min-h-0 flex-1 grid-cols-1 content-end items-stretch gap-10 lg:grid-cols-2 lg:content-stretch lg:items-stretch lg:gap-x-0 lg:gap-y-10">
            <div className="flex w-full min-h-0 flex-col items-stretch lg:h-full lg:min-h-0 lg:pr-8 xl:pr-12">
              <GlobeCard />
            </div>

            <div className="mx-auto flex min-h-0 w-full min-w-0 max-w-2xl flex-col items-stretch gap-5 pb-1 text-left sm:gap-6 lg:mx-0 lg:max-w-none lg:min-w-0 lg:gap-8 lg:pl-8 xl:pl-12">
              <p className="m-0 w-full text-left font-['DM_Sans',sans-serif] text-xl font-semibold leading-[1.2] tracking-[1.8px] text-[#6B7280] sm:text-2xl">
                What is Commonwealth Union?
              </p>
              <h2
                id="cwu-about-heading"
                className="m-0 w-full max-w-none text-left font-[Georgia,serif] text-[clamp(1.75rem,4.5vw+0.5rem,4rem)] font-normal leading-[1.1] tracking-[0] min-[900px]:text-[3.25rem] lg:text-[64px]"
              >
                <span className="block text-balance" style={{ color: HEADLINE_DARK }}>
                  An established global network spanning{' '}
                </span>
                <span className="block text-balance" style={{ color: HEADLINE_LIGHT }}>
                  all 56 nations
                </span>
              </h2>
              <div className="grid w-full min-w-0 grid-cols-1 gap-x-10 gap-y-4 text-left md:grid-cols-[minmax(0,3fr)_minmax(0,2.05fr)] md:gap-x-12 md:gap-y-5 lg:gap-x-16 xl:gap-x-20">
                <div className="@container min-w-0">
                  <p className={aboutBodyClass}>
                    Commonwealth Union is an established global network with 12 million readers, a $19
                    trillion GDP footprint, and an International Advisory Board of presidents, prime
                    ministers, and senior statesmen.
                    <br />
                    The CWU token is created by Commonwealth Union Blockchain Network, an official
                    vertical of Commonwealth Union.
                  </p>
                </div>
                <div className="@container min-w-0">
                  <p className={aboutBodyClass}>
                    represented by His Highness Sheikh Saoud bin Faisal Sultan Alqasimi.
                    <br />
                    It puts the network on-chain, opening up participation and cross-border commerce.
                    <br />
                    Built for people, not politics.
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
        <div className="mx-auto grid min-h-0 w-full min-w-0 max-w-[1685px] grid-cols-1 divide-y divide-[#E6E2D9] px-4 py-10 sm:px-6 md:px-10 lg:h-full lg:grid-cols-5 lg:gap-x-0 lg:gap-y-0 lg:content-center lg:divide-x lg:divide-y-0 lg:divide-[#E6E2D9] lg:overflow-x-hidden lg:px-10 lg:py-0 min-[1800px]:px-8">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex min-w-0 flex-col items-center justify-center gap-1 px-2 py-1 max-lg:py-8 sm:gap-1.5 lg:flex-1 lg:px-3"
            >
              <p className="m-0 w-full text-center font-[Georgia,serif] text-[clamp(1.6875rem,4vw,56px)] font-normal leading-none tracking-normal text-[#0A1628] min-[900px]:text-[56px] min-[900px]:leading-[56px]">
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
