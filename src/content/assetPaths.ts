/**
 * Root-relative URLs for files under `public/` (served as-is by Vite).
 * Keep names aligned with on-disk filenames in `public/assets/`.
 */
export const publicImages = {
  heroFoldBgDesktop: '/assets/images/hero-fold-bg-desktop.svg',
  heroFoldBgMobile: '/assets/images/hero-fold-bg-mobile.svg',
  logoHeader: '/assets/images/logo-cwu-header.svg',
  iconTelegram: '/assets/images/icon-telegram.svg',
  iconX: '/assets/images/icon-x.svg',
  networkMedia: '/assets/images/network-icon-media.svg',
  networkNetwork: '/assets/images/network-icon-network.svg',
  networkInfrastructure: '/assets/images/network-icon-infrastructure.svg',
} as const

export const publicVideo = {
  globeCommonwealth: '/assets/video/globe-commonwealth.mp4',
  /** Hero fold intro (tablet/desktop ≥801px). */
  heroFold001: '/assets/video/hero-fold-desktop.mp4',
  /** Hero fold intro (≤800px); mobile aspect clip. */
  heroFoldMobile001: '/assets/video/hero-fold-mobile.mp4',
} as const

/**
 * Portrait URL for an advisory carousel card (`LeaderHalftoneImage`).
 * Files: `public/assets/images/leadership/leader-01.png` … `leader-18.png`.
 */
export function leadershipPortrait(leaderId: string) {
  const file = `leader-${leaderId.padStart(2, '0')}.png`
  return `/assets/images/leadership/${encodeURIComponent(file)}`
}
