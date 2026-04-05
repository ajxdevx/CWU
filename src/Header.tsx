import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import HeaderActionButton from './HeaderActionButton'
import HeaderNav, { NAV_ITEMS } from './HeaderNav'
import HeaderSocialLinks from './HeaderSocialLinks'
import Logo from './Logo'

function motionReduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panelMounted, setPanelMounted] = useState(false)
  const [panelVisible, setPanelVisible] = useState(false)
  const menuId = useId()

  const closeMobileMenu = useCallback(() => {
    setMenuOpen(false)
    setPanelVisible(false)
    if (motionReduced()) {
      setPanelMounted(false)
    }
  }, [])

  const openMobileMenu = useCallback(() => {
    setPanelMounted(true)
    setMenuOpen(true)
    if (motionReduced()) {
      setPanelVisible(true)
      return
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPanelVisible(true))
    })
  }, [])

  const onPanelTransitionEnd = (e: React.TransitionEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return
    if (!['opacity', 'transform'].includes(e.propertyName)) return
    if (!menuOpen && !panelVisible) {
      setPanelMounted(false)
    }
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') closeMobileMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMobileMenu])

  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return
    if (!panelMounted) return
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [panelMounted])

  return (
    <header className="hero-intro-header relative z-30 w-full min-w-0 shrink-0 max-[1799px]:bg-transparent px-4 pb-2.5 pt-[max(0.625rem,env(safe-area-inset-top,0px))] sm:px-5 sm:pb-3 sm:pt-[max(0.75rem,env(safe-area-inset-top,0px))] min-[1800px]:bg-transparent min-[1800px]:px-0 min-[1800px]:py-0">
      <div className="relative mx-auto flex min-h-0 w-full max-w-[min(1685px,calc(100vw-2rem))] shrink-0 items-center justify-between gap-3 rounded-[8px] bg-[#041825] px-4 py-3 sm:gap-4 sm:rounded-[10px] sm:px-5 sm:py-3.5 md:max-w-[min(1685px,calc(100vw-2.5rem))] lg:max-w-[min(1685px,calc(100vw-3rem))] min-[1800px]:mx-0 min-[1800px]:ml-[110px] min-[1800px]:h-[109px] min-[1800px]:w-[1685px] min-[1800px]:max-w-none min-[1800px]:gap-8 min-[1800px]:px-8 min-[1800px]:py-0">
        <div className="flex min-w-0 flex-1 items-center gap-20 sm:gap-28 min-[1275px]:gap-[clamp(7rem,12vw,14rem)] min-[1800px]:gap-52">
          <div className="min-w-0 shrink-0">
            <a
              href="/"
              className="block min-w-0 no-underline"
              onClick={(e) => {
                e.preventDefault()
                closeMobileMenu()
                const root = document.getElementById('root')
                if (root) root.scrollTop = 0
                window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
              }}
            >
              <Logo line1="COMMONWEALTH" line2="UNION BLOCKCHAIN" />
            </a>
          </div>
          <div className="hidden min-w-0 flex-1 min-[1275px]:block">
            <HeaderNav />
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-6 sm:gap-8 min-[1275px]:flex min-[1800px]:gap-10">
          <HeaderSocialLinks />
          <HeaderActionButton />
        </div>

        <div className="flex shrink-0 items-center min-[1275px]:hidden">
          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-[#F0F0F0] transition-[background-color,color] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4]"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => (menuOpen ? closeMobileMenu() : openMobileMenu())}
          >
            {menuOpen ? <X className="size-6" strokeWidth={2.2} aria-hidden /> : <Menu className="size-6" strokeWidth={2.2} aria-hidden />}
          </button>
        </div>
      </div>

      {panelMounted
        ? createPortal(
            <>
              <div
                aria-hidden
                className={[
                  /* Below header only — same top as menu — so the bar stays sharp (no blur/tint). */
                  'fixed left-0 right-0 bottom-0 z-40 bg-[#041825]/55 backdrop-blur-[7px] transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none min-[1275px]:hidden',
                  'top-[calc(env(safe-area-inset-top,0px)+6.5rem)] sm:top-[calc(env(safe-area-inset-top,0px)+7.25rem)]',
                  panelVisible
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0',
                ].join(' ')}
                onClick={closeMobileMenu}
              />
              <nav
                id={menuId}
                className={[
                  /* Portal to body: header uses transform animation, which breaks fixed positioning inside it */
                  'fixed inset-x-4 z-100 flex min-h-0 flex-col overflow-hidden overscroll-contain rounded-2xl border border-white/15 bg-[#041825] shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:inset-x-5 min-[1275px]:hidden',
                /* ~80% of viewport height on mobile/tablet menu; clamped so it never spills past the screen. */
                'top-[calc(env(safe-area-inset-top,0px)+6.5rem)] sm:top-[calc(env(safe-area-inset-top,0px)+7.25rem)]',
                'h-[min(80dvh,calc(100dvh-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)-6.5rem-0.5rem))] sm:h-[min(80dvh,calc(100dvh-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)-7.25rem-0.75rem))]',
                'origin-top transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                panelVisible
                  ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                  : 'pointer-events-none -translate-y-2 scale-[0.97] opacity-0',
              ].join(' ')}
              aria-label="Site mobile"
              onTransitionEnd={onPanelTransitionEnd}
            >
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-6 sm:py-5">
                <ul className="m-0 mx-auto flex w-full max-w-md shrink-0 list-none flex-col divide-y divide-white/10 p-0 pt-6 text-center sm:pt-8">
                  {NAV_ITEMS.map(({ label, href }) => (
                    <li key={href} className="py-0">
                      <a
                        href={href}
                        className="block py-3.5 text-center font-['DM_Sans',sans-serif] text-[17px] font-normal leading-[120%] tracking-[0.2px] text-white no-underline transition-opacity hover:opacity-85 focus-visible:rounded-md focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4]"
                        onClick={() => closeMobileMenu()}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mx-auto mt-auto mb-3 flex w-full max-w-md flex-col pt-5 sm:mb-4 sm:pt-6">
                  <div className="flex items-center justify-center gap-6 sm:gap-8">
                    <span className="sr-only">Social</span>
                    <HeaderSocialLinks />
                  </div>
                  <div className="mt-4 flex justify-center sm:mt-5 [&_button]:box-border [&_button]:mx-auto [&_button]:flex [&_button]:w-full [&_button]:max-w-[min(100%,20rem)] [&_button]:justify-center [&_button]:px-8 [&_button]:py-4 sm:[&_button]:max-w-none sm:[&_button]:px-10 sm:[&_button]:py-5">
                    <HeaderActionButton />
                  </div>
                </div>
              </div>
            </nav>
            </>,
            document.body,
          )
        : null}
    </header>
  )
}
