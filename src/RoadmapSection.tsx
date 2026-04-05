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
    bg: 'bg-[#0F3554]',
  },
  {
    badge: 'Direction',
    badgeTone: 'direction' as const,
    title: 'Real-world verticals',
    body:
      'Education, visa services, hospitality, and 500+ planned verticals for real economies.',
    tags: ['Education', 'Visa', 'Hotels', '500+ verticals'],
    bg: 'bg-[#1A5588]',
  },
] as const

/** Tag chips: left-aligned row (spacing from title/desc via parent gap) */
const TAG_ROW =
  'mt-3 flex shrink-0 flex-wrap items-center justify-start gap-[10px] sm:mt-4'
const TAG_BOX =
  "box-border inline-flex h-fit w-fit shrink-0 items-center justify-center rounded-lg bg-[#F0EEEA]/16 px-3 py-2 font-['DM_Sans',sans-serif] text-[16px] font-medium leading-[1.2] tracking-normal text-[#F7F7F7]"

/** Badge label (Figma text): DM Sans bold 16px, leading 120%, tracking 1.2px, #1FB893 */
const BADGE_TEXT =
  "font-['DM_Sans',sans-serif] text-[16px] font-bold uppercase leading-[1.2] tracking-[1.2px] text-[#1FB893]"

/** Active: fill #2DD4A8 @ 10%, stroke 1px @ 30%, radius 8, padding 8×12 */
const BADGE_ACTIVE =
  'rounded-lg border border-[#2DD4A8]/30 bg-[#2DD4A8]/10 px-3 py-2'
/** Direction: same box pattern, softer fill/stroke */
const BADGE_DIRECTION =
  'rounded-lg border border-[#2DD4A8]/20 bg-[#2DD4A8]/5 px-3 py-2'

const badgeClass = (tone: 'active' | 'direction') =>
  `${BADGE_TEXT} ${tone === 'active' ? BADGE_ACTIVE : BADGE_DIRECTION}`

export default function RoadmapSection() {
  return (
    <section
      className="box-border flex min-h-[765px] w-full min-w-0 shrink-0 flex-col overflow-y-auto bg-[#F7F5F0] py-8 sm:py-10 lg:h-[765px] lg:min-h-[765px] lg:overflow-hidden lg:py-10"
      aria-labelledby="roadmap-section-title"
    >
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1920px] min-w-0 flex-1 flex-col px-4 sm:px-6 lg:px-10 min-[1800px]:px-8">
        <div className="shrink-0">
          <p className="m-0 w-full max-w-[664px] text-left font-['DM_Sans',sans-serif] text-xl font-semibold leading-[1.2] tracking-[1.8px] text-[#6B7280] sm:text-2xl">
            Roadmap
          </p>
          <h2
            id="roadmap-section-title"
            className="mt-3 w-full max-w-[664px] text-left font-[Georgia,serif] text-[clamp(1.875rem,4.25vw+0.5rem,4rem)] font-normal leading-[1.2] tracking-normal sm:mt-4 lg:mt-5 lg:text-[64px]"
          >
            <span className="block text-balance" style={{ color: ROADMAP_HEADLINE_FIRST }}>
              A digital layer for
            </span>
            <span
              className="block max-md:text-balance md:whitespace-nowrap"
              style={{ color: ROADMAP_HEADLINE_SECOND }}
            >
              real-world opportunity.
            </span>
          </h2>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col items-center gap-5 sm:mt-8 md:flex-row md:flex-nowrap md:justify-center lg:mt-10">
          {CARDS.map(({ badge, badgeTone, title, body, tags, bg }) => (
            <div
              key={title}
              className={`${bg} box-border flex min-h-[280px] w-full max-w-[610px] shrink-0 flex-col overflow-x-hidden overflow-y-auto rounded-2xl md:h-[322px] md:min-h-[322px] md:w-[610px] md:max-w-none`}
            >
              <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 px-6 py-4 sm:px-7 sm:py-5">
                <div className="flex shrink-0 items-start justify-between gap-2 pt-1 sm:pt-2">
                  <span
                    className={`box-border inline-flex shrink-0 items-center justify-center gap-2.5 ${badgeClass(badgeTone)}`}
                  >
                    {badge}
                  </span>
                  <ArrowRight
                    className="size-[1.35rem] shrink-0 origin-center translate-y-1 rotate-90 text-white opacity-90 sm:size-6 md:translate-y-0 md:rotate-0"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-4 text-left sm:gap-5">
                  <h3 className="m-0 w-full min-w-0 text-balance font-[Georgia,serif] text-[clamp(1.5rem,4.25vw,2rem)] font-normal leading-[1.2] tracking-normal text-white md:text-[32px]">
                    {title}
                  </h3>
                  <p className="m-0 min-h-0 w-full min-w-0 font-['DM_Sans',sans-serif] text-[clamp(1.0625rem,3.4vw,1.3125rem)] font-normal leading-[1.36] tracking-normal text-white/70 md:text-[20px] md:leading-[23.9px]">
                    {body}
                  </p>
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
          ))}
        </div>
      </div>
    </section>
  )
}
