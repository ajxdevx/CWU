import { ArrowRight } from 'lucide-react'

export default function HeaderActionButton() {
  return (
    <button
      type="button"
      className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-[14.19px] bg-[#2D303A] px-10 py-5 text-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4]"
    >
      <span className="font-['DM_Sans',sans-serif] text-[16px] font-bold leading-[120%] tracking-[0] text-[#F0F0F0]">
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
