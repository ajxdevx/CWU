/**
 * Root-relative URLs for files under `public/` (served as-is by Vite).
 * Keep names aligned with on-disk filenames in `public/assets/`.
 */
export const publicImages = {
  favicon: '/assets/images/favicon.svg',
  heroFoldBgDesktop: '/assets/images/hero-fold-bg-desktop.svg',
  heroFoldBgMobile: '/assets/images/hero-fold-bg-mobile.svg',
  logoHeader: '/assets/images/logo-cwu-header.svg',
  iconTelegram: '/assets/images/icon-telegram.svg',
  iconX: '/assets/images/icon-x.svg',
  networkMedia: '/assets/images/network-icon-media.svg',
  networkNetwork: '/assets/images/network-icon-network.svg',
  networkInfrastructure: '/assets/images/network-icon-infrastructure.svg',
  coin: '/assets/images/coin.svg',
  coinTexture: '/assets/images/coin-texture.png',
} as const

export const publicVideo = {
  globeCommonwealth: '/assets/video/globe-commonwealth.mp4',
  /** Hero fold intro (tablet/desktop ≥801px); filename has spaces/parens — URL-encoded for fetch. */
  heroFold001: '/assets/video/CWU%20Hero%20001%281%29.mp4',
  /** Hero fold intro (≤800px); mobile aspect clip. */
  heroFoldMobile001: '/assets/video/CWU%20Hero%20Mobile%20001%281%29.mp4',
  /** VP9 + alpha (FFmpeg chromakey). Primary on desktop so blue bg is real transparency, not CSS blend. */
  heroFoldChromaWebm: '/assets/video/hero-fold-chroma.webm',
} as const

/**
 * Portrait URLs for the advisory carousel (`LeaderHalftoneImage`).
 * Files live in `public/assets/images/leadership/` as `leader-01.png` … `leader-18.png` (see `leadershipPortrait`).
 */
export function leadershipCardImage(filename: string) {
  return `/assets/images/leadership/${encodeURIComponent(filename)}`
}

/** Stable kebab-style filenames: `leader-01.png` … `leader-18.png` (matches each card’s string `id`). */
export function leadershipPortrait(leaderId: string) {
  return leadershipCardImage(`leader-${leaderId.padStart(2, '0')}.png`)
}
