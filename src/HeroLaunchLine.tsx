/** Hero launch row: 385×24 fixed; DM Sans bold 20px, leading 120%, tracking 1.8px, #3CDAC4, left / top. */
export default function HeroLaunchLine() {
  return (
    <div className="relative -left-px mt-16 flex h-[24px] w-[385px] shrink-0 items-center justify-start gap-2 rounded-none md:mt-24 lg:mt-28">
      <span
        className="h-2 w-2 shrink-0 rounded-full bg-[#3CDAC4]"
        aria-hidden={true}
      />
      <p className="m-0 min-w-0 flex-1 p-0 text-left font-['DM_Sans',sans-serif] text-[20px] font-bold leading-[120%] tracking-[1.8px] text-[#3CDAC4]">
        Launching 8 April 2026 · Solana
      </p>
    </div>
  )
}
