const TELEGRAM_ICON_SRC = '/a%281%29.svg'
const X_ICON_SRC = '/a%282%29.svg'

const LINKS = [
  { href: 'https://t.me', label: 'Telegram', imgSrc: TELEGRAM_ICON_SRC },
  { href: 'https://x.com/CWUblockchain', label: 'Twitter / X', imgSrc: X_ICON_SRC },
] as const

export default function JoinCommunitySection() {
  return (
    <section
      className="box-border flex w-full min-w-0 shrink-0 flex-col items-center justify-center overflow-x-clip bg-[#F7F5F0] py-4 min-[480px]:min-h-[580px] min-[480px]:py-0"
      aria-labelledby="join-community-heading"
    >
      {/*
        Figma headline: Georgia regular 120px, leading 90%, #111111, block ~613px wide, left-aligned.
        min(7.5rem, 100cqi/5.1) caps at 120px and scales down in narrow containers (overflow-x: clip).
      */}
      <div className="mx-auto box-border flex w-full min-w-0 max-w-[613px] flex-col items-center px-6 py-12 text-center @container sm:px-8 sm:py-14">
        <h2
          id="join-community-heading"
          className="m-0 w-full max-w-full text-center font-[Georgia,serif] text-[min(7.5rem,calc(100cqi/5.1))] font-normal leading-[0.9] tracking-normal text-[#111111]"
        >
          <span className="block max-w-full text-center">Join the</span>
          <span className="block max-w-full text-center">community</span>
        </h2>
        <p className="mt-6 w-full text-center text-balance font-['DM_Sans',sans-serif] text-[17px] font-normal leading-[1.35] tracking-normal text-[#777777] sm:mt-8 sm:text-[20px] md:mt-10 md:text-[24px]">
          Stay connected for the latest updates, announcements, and launch details.
        </p>
        <div className="mt-9 flex w-full flex-wrap items-center justify-center gap-2.5 sm:mt-10">
          {LINKS.map(({ href, label, imgSrc }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="box-border inline-flex min-h-[44px] shrink-0 items-center gap-2.5 rounded-xl border border-[#DDDDDD] bg-white px-3.5 py-2.5 font-['DM_Sans',sans-serif] text-[16px] font-medium leading-[1.2] tracking-normal text-[#111111] transition-[border-color,transform] hover:border-[#CCCCCC] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2073A8] sm:px-4 sm:text-[20px]"
            >
              <img
                src={imgSrc}
                alt=""
                width={22}
                height={22}
                decoding="async"
                className="size-[22px] shrink-0 brightness-0"
              />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
