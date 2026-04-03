export type LogoProps = {
  line1: string
  line2: string
}

export default function Logo({ line1, line2 }: LogoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[61px] w-[58px] shrink-0 items-center justify-center">
        <img
          src="/Group.svg"
          alt=""
          width={58}
          height={61}
          decoding="async"
          className="block h-[61px] w-[58px]"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center leading-tight [font-family:Georgia,serif]">
        <span className="text-lg font-normal uppercase tracking-tight text-white">
          {line1}
        </span>
        <span className="text-lg font-normal uppercase tracking-tight text-white">
          {line2}
        </span>
      </div>
    </div>
  )
}
