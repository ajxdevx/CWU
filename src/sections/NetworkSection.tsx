import { publicImages } from '@/content/assetPaths'

const TEAL = '#3CDAC4'
const NETWORK_HEADLINE_DARK = '#0D4A9C'
const NETWORK_HEADLINE_LIGHT = '#227BB3'

type NetworkColumn = {
  readonly n: string
  readonly title: string
  readonly body: string
  readonly bodyLine2?: string
  readonly bodyLine3?: string
  readonly bg: string
  readonly iconSrc: string
}

const MEDIA_BODY_MOBILE =
  'Audience, content, and distribution across Commonwealth markets. The existing 12 million reader network is the foundation.'

const COLUMNS: readonly NetworkColumn[] = [
  {
    n: '01',
    title: 'Media',
    body: MEDIA_BODY_MOBILE,
    bg: 'bg-[#0A1628]',
    iconSrc: publicImages.networkMedia,
  },
  {
    n: '02',
    title: 'Network',
    body: 'Connecting 150M SMEs and 100M+ diaspora professionals',
    bodyLine2: 'into one accessible ecosystem for cross-border',
    bodyLine3: 'commerce.',
    bg: 'bg-[#014778]',
    iconSrc: publicImages.networkNetwork,
  },
  {
    n: '03',
    title: 'Infrastructure',
    body: 'The vision extends into financial tools, settlement systems,',
    bodyLine2: 'and cross-border connectivity for a $19T economy.',
    bg: 'bg-[#2073A8]',
    iconSrc: publicImages.networkInfrastructure,
  },
] as const satisfies readonly NetworkColumn[]

const networkCardNumberClass =
  "w-max shrink-0 text-right font-['DM_Sans',sans-serif] text-[20px] font-bold leading-[1.2] tracking-[1.5px]"

const titleClass =
  "m-0 mb-2 min-w-0 font-cwu-serif text-[clamp(1.375rem,0.28rem+3.9vw,2rem)] font-normal leading-[1.2] tracking-[0] text-white md:text-[32px]"

const bodyClass =
  "m-0 w-full min-w-0 break-words text-white/80 [overflow-wrap:anywhere] font-['DM_Sans',sans-serif] text-[clamp(0.96875rem,0.32rem+3.05vw,1.22rem)] font-normal leading-[1.35] tracking-[0] mobile:text-[clamp(12px,1.55dvh+0.28rem,15px)] mobile:leading-[1.36] md:text-[20px] md:leading-[23.9px]"

function NetworkCardBodyStacked({ col }: { readonly col: NetworkColumn }) {
  if (col.n === '01') {
    return (
      <>
        <span className="max-[800px]:block min-[801px]:hidden">
          Audience, content, and distribution across
          <br />
          Commonwealth markets. The existing 12
          <br />
          million reader network is the foundation.
        </span>
        <span className="hidden min-[801px]:contents">{MEDIA_BODY_MOBILE}</span>
      </>
    )
  }
  if (col.n === '02') {
    return (
      <>
        <span className="max-[800px]:block min-[801px]:hidden">
          Connecting 150M SMEs and 100M+ diaspora
          <br />
          professionals into one accessible ecosystem
          <br />
          for cross-border commerce.
        </span>
        <span className="hidden min-[801px]:contents">
          {col.body}
          <br />
          {col.bodyLine2}
          <br />
          {col.bodyLine3}
        </span>
      </>
    )
  }
  if (col.n === '03') {
    return (
      <>
        <span className="max-[800px]:block min-[801px]:hidden">
          The vision extends into financial tools,
          <br />
          settlement systems, and cross-border
          <br />
          connectivity for a $19T economy.
        </span>
        <span className="hidden min-[801px]:contents">
          {col.body}
          <br />
          {col.bodyLine2}
        </span>
      </>
    )
  }
  return null
}

function NetworkCardBodyDesktop({ col }: { readonly col: NetworkColumn }) {
  if (col.n === '01') {
    return (
      <>
        Audience, content, and distribution across
        <br />
        Commonwealth markets. The existing 12 million reader
        <br />
        network is the foundation.
      </>
    )
  }
  return (
    <>
      {col.body}
      {col.bodyLine2 != null ? (
        <>
          <br />
          {col.bodyLine2}
        </>
      ) : null}
      {col.bodyLine3 != null ? (
        <>
          <br />
          {col.bodyLine3}
        </>
      ) : null}
    </>
  )
}

export default function NetworkSection() {
  return (
    <section
      id="network"
      className="relative w-full min-w-0 shrink-0 overflow-x-hidden scroll-mt-28 bg-white"
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
                className="m-0 w-full text-center font-cwu-serif text-[clamp(1.75rem,4.5vw+0.5rem,4rem)] font-normal leading-[1.1] tracking-[0] min-[900px]:text-left min-[900px]:text-[3.25rem] lg:text-[64px]"
              >
                <span className="block whitespace-nowrap sm:max-[1274px]:whitespace-normal sm:max-[1274px]:text-balance min-[1275px]:whitespace-nowrap">
                  <span style={{ color: NETWORK_HEADLINE_DARK }}>A digital layer for </span>
                  <span style={{ color: NETWORK_HEADLINE_LIGHT }}>real-</span>
                </span>
                <span
                  className="block whitespace-nowrap sm:max-[1274px]:whitespace-normal sm:max-[1274px]:text-balance min-[1275px]:whitespace-nowrap"
                  style={{ color: NETWORK_HEADLINE_LIGHT }}
                >
                  world opportunity.
                </span>
              </h2>
              <p className="m-0 w-full max-w-none text-center font-['DM_Sans',sans-serif] text-[clamp(1.0625rem,1.05vw+0.9rem,1.5rem)] font-normal leading-[1.1] tracking-[0] text-balance text-[#6B7280] min-[900px]:text-left min-[900px]:text-pretty lg:text-[21px] lg:leading-[1.12] min-[1536px]:text-2xl min-[1536px]:leading-[26.4px]">
                CWU connects a globally distributed community across 56 nations into{' '}
                <br className="hidden min-[900px]:block" aria-hidden />
                a single, accessible system. A digital layer for real-world opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 items-stretch overflow-x-clip text-left min-[1275px]:hidden">
        {COLUMNS.map((col) => {
          const { n, title, bg, iconSrc } = col
          return (
          <div
            key={n}
            className={`${bg} relative box-border flex h-full min-h-[260px] min-w-0 flex-col overflow-visible px-5 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-14`}
          >
            <div className="relative z-10 flex shrink-0 items-start justify-between gap-4">
              <img
                src={iconSrc}
                alt=""
                aria-hidden
                decoding="async"
                className="h-10 w-auto max-h-12 max-w-[3rem] shrink-0 object-contain object-left opacity-95"
              />
              <span className={networkCardNumberClass} style={{ color: TEAL }}>
                {n}
              </span>
            </div>
            <div className="w-full min-w-0 shrink-0 absolute inset-x-5 bottom-2 top-[4.25rem] z-0 flex min-h-0 flex-col justify-end pb-2.5 mobile:bottom-6 sm:inset-x-7 sm:bottom-3 sm:pb-3.5 sm:top-[5rem] lg:inset-x-10 lg:bottom-3.5 lg:pb-4 lg:top-[5.5rem]">
              <h3 className={`${titleClass} mb-3 md:mb-4`}>{title}</h3>
              <p className={bodyClass}>
                <NetworkCardBodyStacked col={col} />
              </p>
            </div>
          </div>
          )
        })}
      </div>

      <div className="hidden min-[1275px]:grid min-[1275px]:min-h-[325px] min-[1275px]:w-full min-[1275px]:grid-cols-3 min-[1275px]:grid-rows-[auto_minmax(0,0.65fr)_auto_auto] min-[1275px]:items-stretch min-[1275px]:overflow-x-clip min-[1275px]:text-left">
        {COLUMNS.map((col) => (
          <div
            key={col.n}
            className={`${col.bg} box-border row-span-4 grid min-h-0 grid-rows-subgrid px-5 pt-8 sm:px-7 sm:pt-10 lg:px-10 lg:pt-14`}
          >
            <div className="relative z-10 flex shrink-0 items-start justify-between gap-4">
              <img
                src={col.iconSrc}
                alt=""
                aria-hidden
                decoding="async"
                className="h-10 w-auto max-h-12 max-w-[3rem] shrink-0 object-contain object-left opacity-95"
              />
              <span className={networkCardNumberClass} style={{ color: TEAL }}>
                {col.n}
              </span>
            </div>
            <div aria-hidden className="min-h-0 min-w-0" />
            <h3 className={`${titleClass} self-start -translate-y-2.5`}>{col.title}</h3>
            <p className={`${bodyClass} self-start -translate-y-2.5 pb-1.5 sm:pb-2.5 lg:pb-3`}>
              <NetworkCardBodyDesktop col={col} />
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
