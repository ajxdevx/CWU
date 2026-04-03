/** Coin: ~12% larger than base Figma size; slight translate down; rotation composed in transform. */
export default function CoinVisual() {
  return (
    <img
      src="/Rectangle(3).svg"
      alt=""
      decoding="async"
      className="h-[628px] w-[710px] shrink-0 rounded-none object-contain"
      style={{ transform: 'rotate(9.14deg) translateY(44px)' }}
    />
  )
}
