import CoinVisual from './CoinVisual'
import HeroHeadline from './HeroHeadline'
import HeroLaunchLine from './HeroLaunchLine'
import HeroSubhead from './HeroSubhead'

export default function Hero() {
  return (
    <section className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden px-4 pt-8 pb-4 sm:px-6 sm:pt-10 sm:pb-5 md:pt-11 max-[1659px]:justify-center min-[1660px]:justify-start min-[1660px]:px-8 min-[1660px]:py-4 min-[1660px]:pt-10">
      <div className="mx-auto flex min-h-0 min-w-0 w-full max-w-[1685px] flex-1 flex-col gap-3 overflow-x-clip sm:gap-4 max-[1659px]:flex-none max-[1659px]:grow-0 min-[1660px]:flex-row min-[1660px]:items-start min-[1660px]:justify-between min-[1660px]:gap-8 min-[1660px]:flex-1">
        <div className="flex min-h-0 min-w-0 shrink-0 flex-col items-start gap-3 sm:gap-4 min-[1660px]:mt-3 min-[1660px]:shrink-0 min-[1660px]:gap-4">
          <HeroLaunchLine />
          <div className="relative min-h-0 w-full max-w-full shrink-0 overflow-x-clip min-[1660px]:h-[333px] min-[1660px]:w-[848.7px] min-[1660px]:max-w-none min-[1660px]:overflow-visible">
            <HeroHeadline />
            <HeroSubhead />
          </div>
        </div>
        <div className="flex w-full min-w-0 shrink-0 flex-col items-center justify-start overflow-x-clip px-0 pb-0 pt-1 sm:pt-2 min-[1660px]:w-auto min-[1660px]:self-start min-[1660px]:overflow-visible min-[1660px]:pb-0 min-[1660px]:pt-0">
          <CoinVisual />
        </div>
      </div>
    </section>
  )
}
