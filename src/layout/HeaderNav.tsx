import { NAV_ITEMS } from '@/content/navItems'

export default function HeaderNav() {
  return (
    <nav className="min-w-0" aria-label="Site">
      <ul className="m-0 flex list-none flex-wrap items-center justify-start gap-x-5 gap-y-1.5 p-0 sm:gap-x-6 min-[1800px]:gap-x-8">
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={href} className="shrink-0">
            <a
              href={href}
              className="font-['DM_Sans',sans-serif] text-[16px] font-normal leading-[120%] tracking-[0.2px] whitespace-nowrap text-[#FFFFFF] no-underline transition-opacity hover:opacity-85 focus-visible:rounded-sm focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
