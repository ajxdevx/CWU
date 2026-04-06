import { ArrowRight } from 'lucide-react'

type HeaderActionButtonProps = {
  compactPair?: boolean
}

export default function HeaderActionButton({ compactPair = false }: HeaderActionButtonProps) {
  return (
    <button
      type="button"
      className={
        compactPair
          ? 'hero-intro-cta inline-flex min-h-[56px] min-w-0 flex-1 basis-0 items-center justify-center gap-2 rounded-[14.19px] bg-[#2D303A] px-3 py-4 text-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4] max-[1274px]:py-5 min-[801px]:max-[1274px]:w-full min-[801px]:max-[1274px]:flex-none min-[801px]:max-[1274px]:basis-auto min-[801px]:max-[1274px]:px-4 min-[1275px]:h-auto min-[1275px]:min-h-0 min-[1275px]:w-fit min-[1275px]:shrink-0 min-[1275px]:flex-none min-[1275px]:basis-auto min-[1275px]:gap-1.5 min-[1275px]:py-4 min-[1275px]:max-[1439px]:px-4 min-[1440px]:px-10'
          : 'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-[14.19px] bg-[#2D303A] px-3.5 py-4 text-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4] min-[400px]:gap-2 min-[400px]:px-6 min-[400px]:py-5 sm:px-8 min-[1275px]:px-10'
      }
    >
      <span
        className={
          compactPair
            ? "min-w-0 whitespace-nowrap text-center font-['DM_Sans',sans-serif] text-[clamp(14px,3.5vw,16px)] font-bold leading-[120%] tracking-[0] text-[#F0F0F0] min-[1275px]:text-[16px]"
            : "whitespace-nowrap font-['DM_Sans',sans-serif] text-[14px] font-bold leading-[120%] tracking-[0] text-[#F0F0F0] sm:text-[16px]"
        }
      >
        BUY $CWU
      </span>
      <ArrowRight
        className="size-4 shrink-0 text-[#F0F0F0]"
        aria-hidden
        strokeWidth={2}
      />
    </button>
  )
}
