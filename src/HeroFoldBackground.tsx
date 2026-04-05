/** Full-bleed graphic behind the header + hero. Small-screen scale is driven by scoped CSS (see index.css) because the img’s intro animation overrode parent Tailwind scales. */
export default function HeroFoldBackground() {
  return (
    <div className="hero-fold-graphic pointer-events-none absolute inset-0 z-0 min-h-0 overflow-hidden" aria-hidden>
      <div className="hero-fold-graphic-inner h-full min-h-0 w-full min-[1275px]:h-full min-[1275px]:min-h-full">
        <img
          src="/Untitled%20design%281%29.svg"
          alt=""
          decoding="async"
          fetchPriority="high"
          className="hero-intro-cover block h-full w-full max-h-full object-contain max-[799px]:object-[0%_74%] max-[1274px]:max-h-full max-[1274px]:w-full sm:max-[1274px]:object-[50%_60%] min-[1275px]:max-h-none min-[1275px]:min-h-full min-[1275px]:w-full min-[1275px]:object-cover min-[1275px]:object-right"
        />
      </div>
    </div>
  )
}
