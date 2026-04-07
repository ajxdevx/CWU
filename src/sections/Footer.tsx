import Logo from '@/components/Logo'
import { TELEGRAM_URL, X_URL } from '@/content/socialAssets'

const NAVIGATE_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Network', href: '#network' },
  { label: 'Advisory', href: '#advisory' },
  { label: 'How to Buy', href: '#how-to-buy' },
  { label: 'FAQ', href: '#faq' },
] as const

const CONNECT_LINKS = [
  { label: 'Telegram', href: TELEGRAM_URL },
  { label: 'Twitter / X', href: X_URL },
  {
    label: 'blockchain.commonwealthunion.com',
    href: 'https://blockchain.commonwealthunion.com',
  },
] as const

const linkClass =
  "text-left font-['DM_Sans',sans-serif] text-[16px] font-normal leading-[1.2] tracking-normal text-white/55 no-underline transition-opacity hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4]"

const columnHeadingClass =
  "m-0 mb-4 text-left font-['DM_Sans',sans-serif] text-[16px] font-bold leading-[1.2] tracking-[1.5px] text-white/30 sm:mb-5"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="box-border flex min-h-[600px] w-full min-w-0 shrink-0 flex-col bg-[#0A1628]">
      <div className="mx-auto flex min-h-[600px] w-full max-w-[1920px] flex-1 flex-col px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 2xl:px-16">
        <div className="flex shrink-0 flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <a href="#about" className="max-w-full shrink-0 no-underline opacity-95 hover:opacity-100">
            <Logo line1="COMMONWEALTH" line2="UNION BLOCKCHAIN" />
          </a>

          <div className="grid w-full min-w-0 grid-cols-2 gap-x-6 sm:gap-x-12 lg:w-auto lg:grid-cols-[auto_auto] lg:shrink-0 lg:gap-x-8">
            <nav className="min-w-0" aria-label="Footer navigate">
              <h2 className={columnHeadingClass}>Navigate</h2>
              <ul className="m-0 flex list-none flex-col gap-3 p-0 sm:gap-3.5">
                {NAVIGATE_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} className={linkClass}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="min-w-0" aria-label="Footer connect">
              <h2 className={columnHeadingClass}>Connect</h2>
              <ul className="m-0 flex list-none flex-col gap-3 p-0 sm:gap-3.5">
                {CONNECT_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className={`${linkClass} wrap-break-word`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="@container flex min-h-0 min-w-0 flex-1 flex-col items-start justify-center overflow-x-auto py-10 [-ms-overflow-style:none] [scrollbar-width:none] sm:py-12 [&::-webkit-scrollbar]:hidden">
          <p
            className="m-0 max-w-full text-left font-cwu-serif text-[clamp(0.6875rem,min(6.75vw+0.125rem,calc(100cqi/11)),6.875rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white/30 select-none"
            aria-hidden
          >
            <span className="block">Commonwealth</span>
            <span className="block">Union Blockchain</span>
          </p>
        </div>

        <div className="mt-auto flex shrink-0 flex-col items-center gap-6 border-t border-white/15 pt-8 text-center sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pt-10 sm:text-left">
          <p className="m-0 max-w-[322px] font-['DM_Sans',sans-serif] text-[14px] font-normal leading-[1.2] tracking-normal text-white/60">
            © {year} Commonwealth Union. All rights reserved.
          </p>
          <p className="m-0 max-w-[593px] font-['DM_Sans',sans-serif] text-[14px] font-normal leading-[18.4px] tracking-normal text-white/60">
            Commonwealth Union is an independent network. Not a government body. Not affiliated with the
            Commonwealth Secretariat. CWU is a community token — not financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
