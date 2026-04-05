type LearnMoreButtonProps = {
  compactPair?: boolean
}

export default function LearnMoreButton({ compactPair = false }: LearnMoreButtonProps) {
  return (
    <button
      type="button"
      className={
        compactPair
          ? 'inline-flex min-h-[56px] min-w-0 flex-1 basis-0 items-center justify-center rounded-[14.19px] border-[1.42px] border-solid border-[rgba(255,255,255,0.15)] bg-transparent px-3 py-4 text-center transition-[border-color,opacity] hover:border-[rgba(255,255,255,0.28)] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4] max-[1259px]:py-5 sm:max-[1259px]:px-4 min-[1260px]:h-auto min-[1260px]:min-h-0 min-[1260px]:w-fit min-[1260px]:shrink-0 min-[1260px]:flex-none min-[1260px]:basis-auto min-[1260px]:py-4 min-[1260px]:min-[400px]:px-6 min-[1260px]:min-[400px]:py-5 min-[1260px]:sm:px-8 min-[1260px]:px-10'
          : 'inline-flex w-fit shrink-0 items-center justify-center rounded-[14.19px] border-[1.42px] border-solid border-[rgba(255,255,255,0.15)] bg-transparent px-3.5 py-4 text-center transition-[border-color,opacity] hover:border-[rgba(255,255,255,0.28)] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4] min-[400px]:px-6 min-[400px]:py-5 sm:px-8 min-[1260px]:px-10'
      }
    >
      <span
        className={
          compactPair
            ? "min-w-0 whitespace-nowrap text-center font-['DM_Sans',sans-serif] text-[clamp(14px,3.5vw,16px)] font-bold leading-[120%] tracking-[0] text-[#F0F0F0] min-[1260px]:text-[16px]"
            : "whitespace-nowrap font-['DM_Sans',sans-serif] text-[14px] font-bold leading-[120%] tracking-[0] text-[#F0F0F0] sm:text-[16px]"
        }
      >
        Learn More
      </span>
    </button>
  )
}
