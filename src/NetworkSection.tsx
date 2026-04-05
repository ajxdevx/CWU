const TEAL = '#3CDAC4'
/** Figma: Dark blue / Blue selection colors */
const NETWORK_HEADLINE_DARK = '#0D4A9C'
const NETWORK_HEADLINE_LIGHT = '#227BB3'

const COLUMNS = [
  {
    n: '01',
    title: 'Media',
    body: 'Audience, content, and distribution across Commonwealth markets. The existing 12 million reader network is the foundation.',
    bg: 'bg-[#0A1628]',
    iconSrc: '/Vector%281%29.svg',
  },
  {
    n: '02',
    title: 'Network',
    body: 'Connecting 150M SMEs and 100M+ diaspora professionals into',
    bodyLine2: 'one accessible ecosystem for cross-border',
    bodyLine3: 'commerce.',
    bg: 'bg-[#0F3554]',
    iconSrc: '/Frame%2010.svg',
  },
  {
    n: '03',
    title: 'Infrastructure',
    body: 'The vision extends into financial tools, settlement systems, and cross-border connectivity',
    bodyLine2: 'for a $19T economy.',
    bg: 'bg-[#1A5588]',
    iconSrc: '/Frame%2015.svg',
  },
] as const

export default function NetworkSection() {
  return (
    <section
      id="network"
      className="relative w-full shrink-0 scroll-mt-28 bg-white"
      aria-labelledby="network-section-title"
    >
      <div className="mx-auto box-border w-full max-w-[1685px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 min-[900px]:flex min-[900px]:h-[485px] min-[900px]:flex-col min-[900px]:justify-center min-[1800px]:px-8">
        <div className="w-full min-h-0 max-[899px]:text-center min-[900px]:text-left">
          <div className="flex min-h-0 flex-col items-center gap-3 sm:gap-4 min-[900px]:ml-4 min-[900px]:flex-row min-[900px]:items-start min-[900px]:gap-x-6 lg:ml-5 lg:gap-x-8 min-[1200px]:gap-x-10 min-[1800px]:gap-x-12">
            <p className="m-0 shrink-0 font-['DM_Sans',sans-serif] text-xl font-semibold leading-[1.2] tracking-[1.8px] text-[#6B7280] sm:text-2xl min-[900px]:max-w-[200px] min-[900px]:pt-2 lg:pt-3 xl:pt-4">
              The Network
            </p>
            <div className="flex min-w-0 w-full max-w-2xl flex-1 flex-col items-center gap-5 min-[900px]:max-w-none min-[900px]:items-stretch min-[900px]:pl-5 lg:gap-6 lg:pl-6">
              <h2
                id="network-section-title"
                className="m-0 w-full text-center font-[Georgia,serif] text-[clamp(1.75rem,4.5vw+0.5rem,4rem)] font-normal leading-[1.1] tracking-[0] min-[900px]:text-left min-[900px]:text-[3.25rem] lg:text-[64px]"
              >
                <span
                  className="block whitespace-nowrap"
                  style={{ color: NETWORK_HEADLINE_DARK }}
                >
                  A digital layer for
                </span>
                <span
                  className="block whitespace-nowrap"
                  style={{ color: NETWORK_HEADLINE_LIGHT }}
                >
                  real-world opportunity.
                </span>
              </h2>
              <p className="m-0 w-full max-w-none text-center font-['DM_Sans',sans-serif] text-[clamp(1.0625rem,1.05vw+0.9rem,1.5rem)] font-normal leading-[1.1] tracking-[0] text-[#6B7280] min-[900px]:text-left lg:text-[21px] lg:leading-[1.12] min-[1536px]:text-2xl min-[1536px]:leading-[26.4px]">
                <span className="block text-balance">
                  CWU connects a globally distributed community across 56 nations into
                </span>
                <span className="block text-balance">a single, accessible system.</span>
                <span className="mt-1 block min-[900px]:mt-1.5">
                  <span className="block whitespace-nowrap">A digital layer for</span>
                  <span className="block whitespace-nowrap">real-world opportunity.</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 text-left md:grid-cols-3">
        {COLUMNS.map(({ n, title, body, bodyLine2, bodyLine3, bg, iconSrc }) => (
          <div
            key={n}
            className={`${bg} box-border flex min-h-[260px] flex-col overflow-y-auto px-5 py-8 sm:px-7 sm:py-10 md:h-[325px] md:min-h-[325px] lg:px-10 lg:py-14`}
          >
            <div className="flex shrink-0 items-start justify-between gap-4">
              <img
                src={iconSrc}
                alt=""
                aria-hidden
                decoding="async"
                className="h-10 w-auto max-h-12 max-w-[3rem] shrink-0 object-contain object-left opacity-95"
              />
              <span
                className="w-max shrink-0 text-right font-['DM_Sans',sans-serif] text-[20px] font-bold leading-[1.2] tracking-[1.5px]"
                style={{ color: TEAL }}
              >
                {n}
              </span>
            </div>
            <div className="mt-auto flex min-h-0 w-full min-w-0 flex-col">
              <h3 className="m-0 mb-3 font-[Georgia,serif] text-[clamp(1.375rem,0.28rem+3.9vw,2rem)] font-normal leading-[1.2] tracking-[0] text-white md:mb-4 md:text-[32px]">
                {title}
              </h3>
              <p className="m-0 w-full font-['DM_Sans',sans-serif] text-[clamp(0.96875rem,0.32rem+3.05vw,1.22rem)] font-normal leading-[1.35] tracking-[0] text-white/80 md:text-[20px] md:leading-[23.9px]">
                {body}
                {bodyLine2 != null ? (
                  <>
                    <br />
                    {bodyLine2}
                  </>
                ) : null}
                {bodyLine3 != null ? (
                  <>
                    <br />
                    {bodyLine3}
                  </>
                ) : null}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
