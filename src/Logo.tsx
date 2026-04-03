export type LogoProps = {
  line1: string
  line2: string
}

export default function Logo({ line1, line2 }: LogoProps) {
  return (
    <div className="flex h-[109px] w-full items-center gap-4">
      <div className="shrink-0">
        <img
          src="/headerlogosvg.svg"
          alt=""
          width={58}
          height={61}
          decoding="async"
          className="block h-[61px] w-[58px]"
        />
      </div>
      <div
        className="flex h-[40px] w-[688px] shrink-0 flex-col justify-center rounded-none text-left"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <span className="text-[19.73px] font-normal leading-[100%] text-[#FFFFFF]">
          {line1}
        </span>
        <span className="text-[19.73px] font-normal leading-[100%] text-[#FFFFFF]">
          {line2}
        </span>
      </div>
    </div>
  )
}
