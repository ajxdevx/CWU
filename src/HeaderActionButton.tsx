import { ArrowRight } from 'lucide-react'

export default function HeaderActionButton() {
  return (
    <button
      type="button"
      className="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-[14.19px] bg-[#2D303A] px-3.5 py-4 text-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4] min-[400px]:gap-2 min-[400px]:px-6 min-[400px]:py-5 sm:px-8 min-[1260px]:px-10"
    >
      <span className="whitespace-nowrap font-['DM_Sans',sans-serif] text-[14px] font-bold leading-[120%] tracking-[0] text-[#F0F0F0] sm:text-[16px]">
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
