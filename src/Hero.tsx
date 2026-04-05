import HeaderActionButton from './HeaderActionButton'
import LearnMoreButton from './LearnMoreButton'
import ContractAnnouncementBar from './ContractAnnouncementBar'
import HeroHeadline from './HeroHeadline'
import HeroLaunchLine from './HeroLaunchLine'
import HeroSubhead from './HeroSubhead'

export default function Hero() {
  return (
    <section className="hero-section-scroll relative flex w-full min-w-0 shrink-0 flex-col overflow-hidden px-4 pt-8 pb-[max(1rem,env(safe-area-inset-bottom,0px))] max-[1274px]:min-h-0 max-[1274px]:flex-1 max-[1274px]:justify-start sm:px-6 sm:pt-10 sm:pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] min-[1275px]:min-h-[calc(100svh-7rem)] min-[1275px]:px-8 min-[1275px]:py-4 min-[1275px]:pt-10 min-[1275px]:pb-4">
      <div className="relative z-10 mx-auto flex min-h-0 min-w-0 w-full max-w-[1685px] flex-1 flex-col gap-6 pb-4 sm:gap-8 min-[1275px]:gap-8">
        {/*
          ≤1274px: copy + CTAs → spacer → contract.
          ≥1275px: copy, then one row — CTAs left, contract bar right (full width).
        */}
        <div className="order-1 flex min-h-0 w-full max-w-full min-w-0 shrink-0 flex-col items-center gap-3 sm:gap-4 pt-5 sm:pt-7 max-[1274px]:items-stretch min-[1275px]:mt-3 min-[1275px]:max-w-[848.7px] min-[1275px]:w-full min-[1275px]:shrink-0 min-[1275px]:items-start min-[1275px]:gap-4 min-[1275px]:pt-0">
          <HeroLaunchLine />
          <div className="relative min-h-0 w-full max-w-full shrink-0 overflow-x-visible min-[1275px]:h-[380px] min-[1275px]:max-w-[848.7px]">
            <HeroHeadline />
            <HeroSubhead />
          </div>
          <div className="mt-0 flex w-full max-w-full shrink-0 flex-row flex-nowrap items-stretch justify-center gap-2 self-stretch min-w-0 min-[801px]:max-[1274px]:mt-1 min-[801px]:max-[1274px]:gap-3 min-[801px]:max-[1274px]:w-full min-[801px]:max-[1274px]:max-w-[min(36rem,calc(100%-0.5rem))] min-[801px]:max-[1274px]:self-start min-[801px]:max-[1274px]:flex-col min-[801px]:max-[1274px]:flex-nowrap md:mt-2 md:gap-4 min-[1275px]:hidden">
            <HeaderActionButton compactPair />
            <LearnMoreButton compactPair />
          </div>
        </div>

        <div className="order-2 flex w-full min-w-0 shrink-0 flex-row flex-nowrap items-center justify-between gap-3 max-[1274px]:hidden min-[1275px]:mt-16 min-[1275px]:max-[1439px]:gap-3 min-[1440px]:gap-8">
          <div className="flex min-w-0 flex-1 flex-row flex-nowrap items-stretch justify-start gap-2 min-[1275px]:max-[1439px]:gap-2 min-[1440px]:gap-4">
            <HeaderActionButton compactPair />
            <LearnMoreButton compactPair />
          </div>
          <div className="min-w-0 shrink-0 min-[1275px]:max-[1439px]:pl-2 min-[1275px]:max-[1439px]:pr-4 min-[1440px]:pr-10">
            <ContractAnnouncementBar />
          </div>
        </div>

        <div
          className="pointer-events-none order-2 block min-h-[min(18svh,160px)] w-full shrink-0 max-[800px]:min-h-[min(15svh,140px)] min-[801px]:max-[1274px]:min-h-[min(22svh,200px)] min-[1275px]:hidden"
          aria-hidden
        />

        <div className="hero-contract-mobile-offset order-3 flex w-full min-w-0 shrink-0 flex-col items-stretch max-[1274px]:mt-auto max-[1274px]:pb-4 max-[1274px]:pt-0 min-[801px]:max-[1274px]:pb-5 min-[1275px]:hidden">
          <div className="flex w-full max-w-full min-w-0 justify-center px-2 sm:px-3">
            <ContractAnnouncementBar />
          </div>
        </div>
      </div>
    </section>
  )
}
