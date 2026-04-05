import HeaderActionButton from './HeaderActionButton'
import LearnMoreButton from './LearnMoreButton'
import ContractAnnouncementBar from './ContractAnnouncementBar'
import HeroHeadline from './HeroHeadline'
import HeroLaunchLine from './HeroLaunchLine'
import HeroSubhead from './HeroSubhead'

export default function Hero() {
  return (
    <section className="hero-section-scroll relative flex w-full min-w-0 shrink-0 flex-col overflow-hidden px-4 pt-8 pb-[max(1rem,env(safe-area-inset-bottom,0px))] max-[1259px]:min-h-0 max-[1259px]:flex-1 max-[1259px]:justify-start sm:px-6 sm:pt-10 sm:pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] min-[1260px]:min-h-[calc(100svh-7rem)] min-[1260px]:px-8 min-[1260px]:py-4 min-[1260px]:pt-10 min-[1260px]:pb-4">
      <div className="relative z-10 mx-auto flex min-h-0 min-w-0 w-full max-w-[1685px] flex-1 flex-col gap-6 sm:gap-8 min-[1260px]:flex-row min-[1260px]:items-start min-[1260px]:justify-between min-[1260px]:gap-8 min-[1260px]:pb-4">
        {/*
          ≤1260px reading order: header (App) → hero copy + CTAs → SVG band (spacer, bg shows through) → contract bar.
          ≥1260px: row layout unchanged; spacer hidden.
        */}
        <div className="order-1 flex min-h-0 w-full max-w-full min-w-0 shrink-0 flex-col items-center gap-3 sm:gap-4 pt-5 sm:pt-7 max-[1259px]:items-stretch min-[1260px]:mt-3 min-[1260px]:max-w-[848.7px] min-[1260px]:w-auto min-[1260px]:shrink-0 min-[1260px]:items-start min-[1260px]:gap-4 min-[1260px]:pt-0">
          <HeroLaunchLine />
          <div className="relative min-h-0 w-full max-w-full shrink-0 overflow-x-visible min-[1260px]:h-[380px] min-[1260px]:w-[848.7px] min-[1260px]:max-w-none">
            <HeroHeadline />
            <HeroSubhead />
          </div>
          <div className="mt-0 flex w-full max-w-full shrink-0 flex-row flex-nowrap items-stretch justify-center gap-2 self-stretch min-w-0 sm:mt-1 sm:gap-3 md:mt-2 md:gap-4 min-[1260px]:mt-16 min-[1260px]:max-w-none min-[1260px]:items-center min-[1260px]:justify-start min-[1260px]:self-auto">
            <HeaderActionButton compactPair />
            <LearnMoreButton compactPair />
          </div>
        </div>

        <div
          className="pointer-events-none order-2 block min-h-[min(18svh,160px)] w-full shrink-0 max-[639px]:min-h-[min(15svh,140px)] sm:max-[1259px]:min-h-[min(22svh,200px)] min-[1260px]:hidden"
          aria-hidden
        />

        <div className="order-3 flex w-full min-w-0 shrink-0 flex-col items-stretch max-[1259px]:mt-auto max-[1259px]:pb-4 max-[1259px]:pt-0 sm:max-[1259px]:pb-5 min-[1260px]:order-2 min-[1260px]:mt-auto min-[1260px]:min-h-0 min-[1260px]:flex-1 min-[1260px]:self-stretch min-[1260px]:justify-end min-[1260px]:pb-2 min-[1260px]:pt-0">
          <div className="flex w-full max-w-full min-w-0 justify-center px-2 sm:px-3 max-[1259px]:-translate-y-2 min-[1260px]:mt-auto min-[1260px]:-translate-y-[calc(6.5rem_*_0.95_*_0.95)] min-[1260px]:justify-end min-[1260px]:px-0 min-[1260px]:pr-10">
            <ContractAnnouncementBar />
          </div>
        </div>
      </div>
    </section>
  )
}
