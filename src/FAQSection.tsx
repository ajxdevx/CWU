import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { FAQ_ITEMS, TOKEN_SITE } from './faqContent'

const SECTION_GUTTER = 'px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-20'
const CONTENT_MAX = 'max-w-[720px]'

function FaqAnswerText({ text }: { text: string }) {
  if (!text.includes(TOKEN_SITE)) return <>{text}</>
  const parts = text.split(TOKEN_SITE)
  return (
    <>
      {parts[0]}
      <a
        href={`https://${TOKEN_SITE}`}
        className="font-medium text-[#2073A8] underline underline-offset-2 hover:text-[#1a5f8a]"
        target="_blank"
        rel="noopener noreferrer"
      >
        {TOKEN_SITE}
      </a>
      {parts.slice(1).join(TOKEN_SITE)}
    </>
  )
}

export default function FAQSection() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((i) => (i === index ? null : index))
  }

  return (
    <section
      id="faq"
      className="box-border flex min-h-0 w-full min-w-0 shrink-0 overflow-x-hidden scroll-mt-28 flex-col bg-white lg:min-h-[800px]"
      aria-labelledby="faq-heading"
    >
      <div
        className={`flex min-h-0 w-full flex-col justify-start py-8 sm:py-10 ${SECTION_GUTTER} md:py-12 lg:min-h-0 lg:flex-1 lg:justify-start lg:py-14 lg:pt-[clamp(2.5rem,10vh,5.5rem)]`}
      >
        <div className="mx-auto flex w-full max-w-full min-w-0 shrink-0 flex-col">
          {/*
            Fluid size from container. Below 800px and 800–1274px: wrap. From 1275px: single line + same center nudge as before.
          */}
          <div className={`mx-auto w-full ${CONTENT_MAX} @container`}>
            <h2
              id="faq-heading"
              className="m-0 w-full min-w-0 whitespace-nowrap font-cwu-serif text-[clamp(1.5rem,calc(0.95rem+100cqi/15.5),6rem)] font-normal leading-[1.12] tracking-normal text-[#111111] max-[799px]:whitespace-normal max-[799px]:text-balance sm:max-[1274px]:whitespace-normal sm:max-[1274px]:text-balance min-[1275px]:whitespace-nowrap text-left md:text-center md:-translate-x-[calc(0.75rem_*_1.05)] lg:-translate-x-[calc(1.05rem_*_1.05)]"
            >
              <span className="inline">Frequently asked </span>
              <span className="inline">questions</span>
            </h2>
          </div>

          <ul className={`m-0 mt-8 w-full list-none divide-y divide-[#DDDDDD] border-none p-0 sm:mt-10 md:mt-12 lg:mt-14 ${CONTENT_MAX} mx-auto`}>
            {FAQ_ITEMS.map(({ q, a }, index) => {
              const isOpen = openIndex === index
              const panelId = `${baseId}-panel-${index}`
              const buttonId = `${baseId}-btn-${index}`

              return (
                <li key={q} className="py-5 sm:py-6">
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      className="flex w-full cursor-pointer items-start justify-between gap-4 border-0 bg-transparent p-0 text-left font-['DM_Sans',sans-serif] text-[20px] font-medium leading-[1.2] tracking-normal text-[#111111] outline-none transition-[color] focus-visible:ring-2 focus-visible:ring-[#1FB893]/50 focus-visible:ring-offset-2 sm:text-[24px]"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(index)}
                    >
                      <span className="min-w-0 flex-1">{q}</span>
                      <span
                        className="inline-flex shrink-0 items-center pt-0.5 text-[#1FB893]"
                        aria-hidden
                      >
                        <Plus
                          className={`size-[17px] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-200 sm:size-[21px] ${isOpen ? 'rotate-45' : ''}`}
                          strokeWidth={2}
                          absoluteStrokeWidth
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0" inert={!isOpen}>
                      <p className="mt-4 mb-0 max-w-none font-['DM_Sans',sans-serif] text-[16px] font-normal leading-[1.45] tracking-normal text-[#777777] sm:text-[17px]">
                        <FaqAnswerText text={a} />
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
