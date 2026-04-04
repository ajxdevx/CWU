/**
 * Inline SVG so /coin-texture.png loads in the document. Same-origin PNG refs
 * inside SVG are blocked when the SVG is loaded via <img src="/coin.svg">.
 */
export default function CoinVisual() {
  return (
    <svg
      width={710}
      height={628}
      viewBox="0 0 715 655"
      fill="none"
      role="img"
      aria-hidden={true}
      className="hero-intro-coin mx-auto block h-auto w-full max-w-[min(100%,min(710px,92vw))] shrink-0 rounded-none max-h-[min(34dvh,300px)] max-[1659px]:max-w-[85vw] min-[1660px]:mx-0 min-[1660px]:max-h-[min(628px,calc(100dvh-240px))] min-[1660px]:w-[min(710px,45vw)] min-[1660px]:max-w-[min(710px,48vw)]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        y="100.686"
        width="633.693"
        height="560.717"
        transform="rotate(-9.14236 0 100.686)"
        fill="url(#pattern0_1_6)"
      />
      <defs>
        <pattern
          id="pattern0_1_6"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1_6"
            transform="scale(0.000284819 0.000322061)"
          />
        </pattern>
        <image
          id="image0_1_6"
          width="3511"
          height="3105"
          preserveAspectRatio="none"
          href="/coin-texture.png"
          xlinkHref="/coin-texture.png"
        />
      </defs>
    </svg>
  )
}
