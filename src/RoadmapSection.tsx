import { ArrowRight } from 'lucide-react'

/** Roadmap two-line headline (Penpot / Figma) */
const ROADMAP_HEADLINE_FIRST = '#014778'
const ROADMAP_HEADLINE_SECOND = '#111111'

const CARDS = [
  {
    badge: 'Active',
    badgeTone: 'active' as const,
    title: 'Stablecoin',
    body:
      'A Commonwealth-focused stablecoin designed for cross-border settlement across member nations.',
    tags: ['Cross-border payments', 'Settlement'],
    bg: 'bg-[#0A1628]',
  },
  {
    badge: 'Direction',
    badgeTone: 'direction' as const,
    title: 'Own blockchain',
    body: 'Purpose-built chain infrastructure for the unique needs of 56 interconnected economies.',
    tags: ['Custom chain', 'Governance'],
    bg: 'bg-[#014778]',
  },
  {
    badge: 'Direction',
    badgeTone: 'direction' as const,
    title: 'Real-world verticals',
    body:
      'Education, visa services, hospitality, and 500+ planned verticals for real economies.',
    tags: ['Education', 'Visa', 'Hotels', '500+ verticals'],
    bg: 'bg-[#2073A8]',
  },
] as const

/** Tag chips: same row + pill style as first card (e.g. “Cross-border payments”) on all breakpoints. */
const TAG_ROW =
  'mt-3 flex shrink-0 flex-nowrap items-center justify-start gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-4 sm:gap-[10px] [&::-webkit-scrollbar]:hidden'
const TAG_BOX =
  "box-border inline-flex h-fit w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#F0EEEA]/16 px-2 py-1.5 font-['DM_Sans',sans-serif] text-[clamp(12px,2.85vw,16px)] font-medium leading-[1.2] tracking-normal text-[#F7F7F7] sm:px-3 sm:py-2"

/** Same text size + padding as `TAG_BOX`; original Active/Direction colors and borders unchanged. */
const BADGE_TEXT =
  "font-['DM_Sans',sans-serif] text-[clamp(12px,2.85vw,16px)] font-bold uppercase leading-[1.2] tracking-[1.2px] text-[#1FB893]"
const BADGE_ACTIVE =
  'rounded-lg border border-[#2DD4A8]/30 bg-[#2DD4A8]/10 px-2 py-1.5 sm:px-3 sm:py-2'
const BADGE_DIRECTION =
  'rounded-lg border border-[#2DD4A8]/20 bg-[#2DD4A8]/5 px-2 py-1.5 sm:px-3 sm:py-2'

const badgeClass = (tone: 'active' | 'direction') =>
  `${BADGE_TEXT} ${tone === 'active' ? BADGE_ACTIVE : BADGE_DIRECTION}`

/** Match NetworkSection card title + body (NetworkSection `titleClass` / `bodyClass`). */
const networkCardTitleClass =
  "m-0 w-full min-w-0 text-balance font-cwu-serif text-[clamp(1.375rem,0.28rem+3.9vw,2rem)] font-normal leading-[1.2] tracking-[0] text-white md:text-[32px]"
const networkCardBodyClass =
  "m-0 min-h-0 w-full min-w-0 break-words text-white/80 [overflow-wrap:anywhere] font-['DM_Sans',sans-serif] text-[clamp(0.96875rem,0.32rem+3.05vw,1.22rem)] font-normal leading-[1.35] tracking-[0] mobile:text-[clamp(12px,1.55dvh+0.28rem,15px)] mobile:leading-[1.36] md:text-[20px] md:leading-[23.9px]"

export default function RoadmapSection() {
  return (
    <section
      className="box-border flex min-h-[765px] w-full min-w-0 shrink-0 flex-col overflow-x-hidden bg-[#F7F5F0] py-8 sm:py-10 lg:min-h-[765px] lg:py-10"
      aria-labelledby="roadmap-section-title"
    >
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1920px] min-w-0 flex-1 flex-col px-4 sm:px-6 lg:px-10 min-[1800px]:px-8">
        <div className="shrink-0">
          <p className="m-0 w-full max-w-[664px] text-left font-['DM_Sans',sans-serif] text-xl font-semibold leading-[1.2] tracking-[1.8px] text-[#6B7280] sm:text-2xl">
            Roadmap
          </p>
          <h2
            id="roadmap-section-title"
            className="mt-3 w-full max-w-[664px] text-left font-cwu-serif text-[clamp(1.875rem,4.25vw+0.5rem,4rem)] font-normal leading-[1.2] tracking-normal sm:mt-4 lg:mt-5 lg:text-[64px]"
          >
            <span
              className="block text-balance wrap-break-word min-[1280px]:whitespace-nowrap"
              style={{ color: ROADMAP_HEADLINE_SECOND }}
            >
              A digital layer for{' '}
            </span>
            <span
              className="block text-balance wrap-break-word min-[1280px]:whitespace-nowrap"
              style={{ color: ROADMAP_HEADLINE_FIRST }}
            >
              real-world opportunity.
            </span>
          </h2>
        </div>

        <div className="mt-6 grid min-h-0 w-full min-w-0 flex-1 grid-cols-1 justify-items-center gap-6 sm:mt-8 min-[1280px]:mt-10 min-[1280px]:grid-cols-2 min-[1680px]:grid-cols-3 min-[1680px]:gap-x-8 min-[1680px]:gap-y-6">
          {CARDS.map(({ badge, badgeTone, title, body, tags, bg }) => {
            return (
              <div
                key={title}
                className={`${bg} box-border flex min-h-[280px] w-full min-w-0 max-w-[610px] shrink-0 flex-col overflow-x-hidden overflow-y-visible rounded-2xl min-[1280px]:h-[325px] min-[1280px]:min-h-[325px] min-[1280px]:max-h-[325px] min-[1280px]:overflow-y-auto`}
              >
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 px-6 py-4 sm:px-7 sm:py-5">
                  <div className="flex shrink-0 items-start justify-between gap-2 pt-1 sm:pt-2">
                    <span
                      className={`box-border inline-flex shrink-0 items-center justify-center gap-2.5 ${badgeClass(badgeTone)}`}
                    >
                      {badge}
                    </span>
                    <ArrowRight
                      className="size-[1.35rem] shrink-0 origin-center translate-y-1 rotate-90 text-white opacity-90 sm:size-6 min-[1280px]:translate-y-0 min-[1280px]:rotate-0"
                      strokeWidth={2.2}
                      aria-hidden
                    />
                  </div>
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-4 text-left sm:gap-5">
                    <h3 className={networkCardTitleClass}>{title}</h3>
                    <p className={networkCardBodyClass}>{body}</p>
                    <div className={TAG_ROW}>
                      {tags.map((t) => (
                        <span key={t} className={TAG_BOX}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
