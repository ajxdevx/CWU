export type LogoProps = {
  line1: string
  line2: string
}

export default function Logo({ line1, line2 }: LogoProps) {
  return (
    <div className="flex min-h-0 w-full min-w-0 items-center gap-3 sm:gap-4 min-[1800px]:h-[109px] min-[1800px]:gap-4">
      <div className="shrink-0">
        <img
          src="/headerlogosvg.svg"
          alt=""
          width={58}
          height={61}
          decoding="async"
          className="block h-10 w-9 sm:h-[52px] sm:w-[50px] md:h-[61px] md:w-[58px] min-[1800px]:h-[61px] min-[1800px]:w-[58px]"
        />
      </div>
      <div
        className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-0.5 rounded-none py-0.5 text-left sm:gap-1 min-[1800px]:h-[40px] min-[1800px]:max-w-[688px] min-[1800px]:flex-none min-[1800px]:shrink-0 min-[1800px]:gap-0 min-[1800px]:py-0"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <span className="text-[14px] font-normal leading-[118%] text-[#FFFFFF] sm:text-[16px] md:text-[18px] min-[1800px]:text-[19.73px] min-[1800px]:leading-[100%]">
          {line1}
        </span>
        <span className="text-[14px] font-normal leading-[118%] text-[#FFFFFF] sm:text-[16px] md:text-[18px] min-[1800px]:text-[19.73px] min-[1800px]:leading-[100%]">
          {line2}
        </span>
      </div>
    </div>
  )
}
