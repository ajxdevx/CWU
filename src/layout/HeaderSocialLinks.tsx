import { TELEGRAM_ICON_SRC, TELEGRAM_URL, X_ICON_SRC, X_URL } from '@/content/socialAssets'

const LINKS = [
  { href: TELEGRAM_URL, label: 'CWU on Telegram', imgSrc: TELEGRAM_ICON_SRC },
  { href: X_URL, label: 'CWU on X (Twitter)', imgSrc: X_ICON_SRC },
] as const

export default function HeaderSocialLinks() {
  return (
    <div className="contents">
      {LINKS.map(({ href, label, imgSrc }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex shrink-0 opacity-90 transition-opacity hover:opacity-100 focus-visible:rounded-sm focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CDAC4]"
        >
          <img
            src={imgSrc}
            alt=""
            width={24}
            height={24}
            decoding="async"
            className="block size-6"
          />
        </a>
      ))}
    </div>
  )
}
