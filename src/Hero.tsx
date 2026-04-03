import CoinVisual from './CoinVisual'
import HeroHeadline from './HeroHeadline'
import HeroLaunchLine from './HeroLaunchLine'
import HeroSubhead from './HeroSubhead'

export default function Hero() {
  return (
    <section className="flex w-full flex-1 flex-col overflow-visible pt-5 md:pt-10 lg:pt-12">
      <div className="mx-auto flex w-full max-w-[1685px] shrink-0 flex-col items-start gap-8 overflow-visible px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-4 overflow-visible lg:mt-3">
          <HeroLaunchLine />
          <div className="relative h-[333px] w-[848.7px] shrink-0 overflow-visible">
            <HeroHeadline />
            <HeroSubhead />
          </div>
        </div>
        <div className="shrink-0 lg:self-start">
          <CoinVisual />
        </div>
      </div>
    </section>
  )
}
