import Logo from './Logo'

export default function Header() {
  return (
    <header className="w-full shrink-0">
      <div className="mx-auto flex h-[109px] w-full max-w-[1685px] items-center bg-[#041825] px-8 ring-1 ring-inset ring-black rounded-[10px]">
        <Logo line1="COMMONWEALTH UNION" line2="NETWORK" />
      </div>
    </header>
  )
}
