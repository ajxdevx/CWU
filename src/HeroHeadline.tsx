import type { CSSProperties } from 'react'

const headlineStyle: CSSProperties = {
  WebkitTextStroke: '1px #000000',
  textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
}

export default function HeroHeadline() {
  return (
    <p
      className="absolute top-[7px] left-[-7px] m-0 box-border h-[240px] w-[848.7px] whitespace-pre-line p-0 text-left font-[Georgia,serif] text-[120px] font-normal leading-[100%] tracking-[0] text-[#FFFFFF]"
      style={headlineStyle}
    >
      {'56 Nations.\nOne network.'}
    </p>
  )
}
