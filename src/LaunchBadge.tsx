import type { CSSProperties } from 'react'

/** 1px outside-style outline (Figma “outside stroke”): ring of hard shadows, no fill eaten by -webkit-text-stroke */
const OUTLINE_1PX =
  '-1px 0 0 #000000, 1px 0 0 #000000, 0 -1px 0 #000000, 0 1px 0 #000000, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000'

const DROP_SHADOW = '0 4px 4px rgba(0, 0, 0, 0.25)'

const textStyle: CSSProperties = {
  textShadow: `${OUTLINE_1PX}, ${DROP_SHADOW}`,
}

export default function LaunchBadge() {
  return (
    <div className="relative h-[24px] w-[388px] shrink-0">
      <p
        className="absolute -left-px top-[-64px] m-0 block h-[24px] w-[388px] whitespace-nowrap p-0 text-left font-['DM_Sans',sans-serif] text-[20px] font-bold leading-[120%] tracking-[1.8px] text-[#3CDAC4]"
        style={textStyle}
      >
        • Launching 8 April 2026 • Solana
      </p>
    </div>
  )
}
