import CoinVisual from './CoinVisual'
import HeroHeadline from './HeroHeadline'

export default function Hero() {
  return (
    <section className="flex w-full flex-1 flex-col overflow-visible pt-10 md:pt-14 lg:pt-16">
      <div className="mx-auto flex w-full max-w-[1685px] flex-1 flex-col gap-8 px-8 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-6 overflow-visible">
          <img
            src="/div.svg"
            alt=""
            width={385}
            height={30}
            decoding="async"
            className="mt-16 block h-[30px] w-[385px] max-w-full shrink-0 md:mt-24 lg:mt-28"
          />
          <div className="relative h-[247px] w-[848.7px] shrink-0 overflow-visible">
            <HeroHeadline />
          </div>
        </div>
        <CoinVisual />
      </div>
    </section>
  )
}
