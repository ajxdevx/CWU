import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

const cardImage = (filename: string) => `/cardimages/${encodeURIComponent(filename)}`

const LEADERS = [
  {
    id: '1',
    name: 'HH Sheikh Saoud bin Faisal Sultan Alqasimi',
    role: 'Founding Patron',
    imageSrc: cardImage('HH Sheikh.png'),
  },
  {
    id: '2',
    name: 'Hon Ranil Wickremesinghe',
    role: 'President of Sri Lanka',
    imageSrc: cardImage('01_Hon_Ranil_Wickremesinghe.png'),
  },
  {
    id: '3',
    name: 'HE Mohamed Nasheed',
    role: 'Former President of Maldives',
    imageSrc: cardImage('02_HE_Mohamed_Nasheed.png'),
  },
  {
    id: '4',
    name: 'HE Olusegun Obasanjo',
    role: 'Former President of Nigeria',
    imageSrc: cardImage('03_HE_Olusegun_Obasanjo.png'),
  },
  {
    id: '5',
    name: 'HE Ameenah Gurib-Fakim',
    role: 'Former President of Mauritius',
    imageSrc: cardImage('04_HE_Ameenah_Gurib-Fakim.png'),
  },
  {
    id: '6',
    name: 'Hon Joseph Muscat',
    role: 'Former Prime Minister of Malta',
    imageSrc: cardImage('05_Hon_Joseph_Muscat.png'),
  },
  {
    id: '7',
    name: 'The Lord Marland Former Minister of State UK',
    role: 'Chairman of the CWEIC',
    imageSrc: cardImage('06_The_Lord_Marland.png'),
  },
  {
    id: '8',
    name: 'The Rt Hon Lord Howell of Guildford',
    role: 'Former Secretary of State UK for Energy and Transport',
    imageSrc: cardImage('07_Rt_Hon_Lord_Howell.png'),
  },
  {
    id: '9',
    name: 'The Lord Ranger CBE',
    role: 'Chairman Conservative Friends of India in the Uk Parliament',
    imageSrc: cardImage('08_The_Lord_Ranger_CBE.png'),
  },
  {
    id: '10',
    name: 'Lady Olga Maitland',
    role: 'Former PPS Min of State and President Security and Defence Forum',
    imageSrc: cardImage('09_Lady_Olga_Maitland.png'),
  },
  {
    id: '11',
    name: 'The Rt Hon Lord Swire KCMG',
    role: 'Former foreign Office Minister of State Uk',
    imageSrc: cardImage('10_Rt_Hon_Lord_Swire_KCMG.png'),
  },
  {
    id: '12',
    name: 'Geoffrey Van Orden CBE',
    role: 'Former Leader of the Conservatives in the European Parliament',
    imageSrc: cardImage('11_Geoffrey_Van_Orden_CBE.png'),
  },
  {
    id: '13',
    name: 'Hon Muralidharan Murthy',
    role: 'Indian & Global Strategist',
    imageSrc: cardImage('12_Hon_Muralidharan_Murthy.png'),
  },
  {
    id: '14',
    name: 'Chris Devonshire–Ellis',
    role: 'Founder and Chairman Dezan',
    imageSrc: cardImage('13_Chris_Devonshire-Ellis.png'),
  },
  {
    id: '15',
    name: 'Hon Milind Deora',
    role: 'Former Union Minister of State India',
    imageSrc: cardImage('14_Hon_Milind_Deora.png'),
  },
  {
    id: '16',
    name: 'Dr Edem Adzogenu',
    role: 'Co-Chairman Afro Champions',
    imageSrc: cardImage('15_Dr_Edem_Adzogenu.png'),
  },
  {
    id: '17',
    name: 'Hon Nirj Deva DL',
    role: 'Chairman and Former MP and MEP',
    imageSrc: cardImage('16_Hon_Nirj_Deva_DL.png'),
  },
  {
    id: '18',
    name: 'H.E.Abdulla Shahid',
    role: 'Former Foreign Minister of the Maldives, former Chairman of the United Nations General Assembly.',
    imageSrc: cardImage('17_HE_Abdulla_Shahid.png'),
  },
] as const

const LEADER_PAGE = LEADERS.length
/** Many sequential copies so “Next” always scrolls right (18 → 1 → 2…) with smooth motion only — no scrollLeft rewind. */
const CAROUSEL_COPIES = 12
const LEADERS_LOOP = Array.from({ length: CAROUSEL_COPIES }, () => [...LEADERS]).flat()

/** Intro heading + controls: wide content line (previously matched 4×434px row) */
const LEADERSHIP_ROW_MAX = 'max-w-[1808px]'
const LEADERSHIP_GUTTER =
  'pl-3 pr-3 sm:pl-4 sm:pr-4 md:pl-5 md:pr-5 lg:pl-6 lg:pr-6 xl:pl-8 xl:pr-8 2xl:pl-12 2xl:pr-12'

export default function LeadershipSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const getCards = () =>
    [...(scrollerRef.current?.querySelectorAll<HTMLElement>('[data-leader-card]') ?? [])]

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const cards = getCards()
    if (cards.length === 0) return

    const scrollLeft = el.scrollLeft
    let current = 0
    let best = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - scrollLeft)
      if (dist < best) {
        best = dist
        current = i
      }
    })

    if (direction === 1) {
      if (current >= cards.length - 1) return
      const t = cards[current + 1]
      el.scrollTo({ left: t.offsetLeft, behavior: 'smooth' })
      return
    }

    if (current <= 0) {
      const t = cards[LEADER_PAGE - 1]
      if (t) el.scrollTo({ left: t.offsetLeft, behavior: 'smooth' })
      return
    }
    const t = cards[current - 1]
    el.scrollTo({ left: t.offsetLeft, behavior: 'smooth' })
  }

  return (
    <section
      id="advisory"
      className="w-full min-w-0 overflow-x-hidden scroll-mt-28 bg-[#FAF9F6] py-10 sm:py-12 md:py-14 min-[1660px]:py-20"
      aria-labelledby="leadership-heading"
    >
      <div className={`w-full min-w-0 ${LEADERSHIP_GUTTER}`}>
        <div className={`w-full min-w-0 ${LEADERSHIP_ROW_MAX}`}>
          <div className="min-w-0 w-full">
            <p className="m-0 max-w-[800px] font-['DM_Sans',sans-serif] text-xl font-semibold leading-[1.2] tracking-[1.8px] text-[#6B7280] sm:text-2xl min-[1660px]:text-2xl">
              Leadership
            </p>
            <h2
              id="leadership-heading"
              className="mt-3 max-w-none text-balance font-[Georgia,serif] font-normal leading-[1.08] tracking-normal text-[#111111] max-[1659px]:whitespace-normal max-[1659px]:text-[clamp(1.6875rem,6.6vw,3.35rem)] sm:mt-4 min-[1660px]:whitespace-nowrap min-[1660px]:text-[64px] min-[1660px]:leading-[55.2px]"
            >
              <span className="block min-[1660px]:inline">
                Backed by global{' '}
              </span>
              <span className="block min-[1660px]:inline">leaders</span>
            </h2>
            <div className="mt-4 flex w-full min-w-0 flex-col gap-4 sm:mt-5 max-[1659px]:flex-col min-[1660px]:flex-row min-[1660px]:items-start min-[1660px]:gap-6">
              <p className="m-0 min-w-0 max-w-[578px] font-['DM_Sans',sans-serif] text-[17px] font-normal leading-[1.35] tracking-normal text-[#777777] sm:text-[18px] md:text-[19px] min-[1660px]:flex-1 min-[1660px]:text-[20px] min-[1660px]:leading-[1.2]">
                Commonwealth Union&apos;s International Advisory Board includes sitting and former presidents, prime
                ministers, and senior statesmen from across the Commonwealth.
              </p>
              <div className="flex w-full shrink-0 items-center justify-end gap-2.5 max-[1659px]:pt-1 min-[1660px]:ml-auto min-[1660px]:w-auto min-[1660px]:justify-end min-[1660px]:pt-0.5">
                <button
                  type="button"
                  className="box-border inline-flex h-16 min-w-[64.89px] shrink-0 items-center justify-center rounded-[17.78px] bg-[#2073A8] px-5 py-2 text-white transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2073A8]"
                  aria-label="Previous leaders"
                  onClick={() => scrollByCard(-1)}
                >
                  <ArrowLeft className="size-5" strokeWidth={2.2} aria-hidden />
                </button>
                <button
                  type="button"
                  className="box-border inline-flex h-16 min-w-[64.89px] shrink-0 items-center justify-center rounded-[17.78px] bg-[#2073A8] px-5 py-2 text-white transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2073A8]"
                  aria-label="Next leaders"
                  onClick={() => scrollByCard(1)}
                >
                  <ArrowRight className="size-5" strokeWidth={2.2} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-8 w-full min-w-0 sm:mt-10 min-[1660px]:mt-12 ${LEADERSHIP_GUTTER}`}>
        <div
          ref={scrollerRef}
          className="flex min-h-0 snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 min-[1660px]:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {LEADERS_LOOP.map(({ id, name, role, imageSrc }, loopIndex) => (
            <article
              key={`leader-${loopIndex}-${id}`}
              data-leader-card
              className="@container flex w-[min(285px,calc(100%-1.25rem))] shrink-0 snap-start snap-always flex-col gap-4 overflow-hidden rounded-[16px] bg-white pb-6 shadow-[0_1px_3px_rgba(15,23,42,0.08)] max-[1659px]:h-auto max-[1659px]:min-h-0 sm:max-[1659px]:w-[min(285px,calc(100%-1.5rem))] sm:rounded-[20px] min-[1660px]:h-[365px] min-[1660px]:max-h-[365px] min-[1660px]:w-[285px] min-[1660px]:gap-3 min-[1660px]:rounded-[20px] min-[1660px]:pb-5"
            >
              <div className="w-full shrink-0 overflow-hidden bg-[#E8E6E1] max-[1659px]:aspect-[285/255] max-[1659px]:h-auto max-[1659px]:min-h-[200px] min-[1660px]:aspect-auto min-[1660px]:h-[255px] min-[1660px]:min-h-[255px] min-[1660px]:max-h-[255px]">
                <img
                  src={imageSrc}
                  alt={name}
                  className="h-full w-full object-cover max-[1659px]:min-h-[200px] min-[1660px]:min-h-0"
                  width={285}
                  height={255}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex w-full min-w-0 flex-col items-start px-4 text-left sm:px-5 max-[1659px]:shrink-0 min-[1660px]:min-h-0 min-[1660px]:flex-1 min-[1660px]:px-4">
                <h3 className="m-0 min-w-0 max-w-full text-balance font-['DM_Sans',sans-serif] font-semibold leading-[1.18] tracking-normal text-[#111111] [font-size:clamp(13.5px,calc(0.62rem+2.55cqi),16px)] min-[1660px]:line-clamp-4">
                  {name}
                </h3>
                <p className="mt-1.5 min-w-0 max-w-full text-pretty font-['DM_Sans',sans-serif] font-normal leading-[1.28] tracking-normal text-[#999999] [font-size:clamp(11px,calc(0.52rem+1.75cqi),14px)] max-[1659px]:mt-1.5 min-[1660px]:mt-1 min-[1660px]:leading-[1.22]">
                  {role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
