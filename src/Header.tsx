import Logo from './Logo'

export default function Header() {
  return (
    <header className="w-full shrink-0">
      <div className="ml-[110px] h-[109px] w-[1685px] shrink-0 rounded-[10px] bg-[#041825] px-8">
        <Logo line1="COMMONWEALTH UNION" line2="NETWORK" />
      </div>
    </header>
  )
}
