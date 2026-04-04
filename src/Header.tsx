import Logo from './Logo'

export default function Header() {
  return (
    <header className="hero-intro-header w-full min-w-0 shrink-0 px-4 pt-3 pb-4 sm:px-5 sm:pt-3.5 sm:pb-5 min-[1800px]:px-0 min-[1800px]:pb-0 min-[1800px]:pt-0">
      <div className="mx-auto w-full max-w-[min(1685px,calc(100%-2rem))] shrink-0 rounded-[8px] bg-[#041825] px-4 py-3.5 sm:rounded-[10px] sm:px-5 sm:py-4 min-[1800px]:mx-0 min-[1800px]:ml-[110px] min-[1800px]:h-[109px] min-[1800px]:w-[1685px] min-[1800px]:max-w-none min-[1800px]:px-8 min-[1800px]:py-0">
        <Logo line1="COMMONWEALTH UNION" line2="NETWORK" />
      </div>
    </header>
  )
}
