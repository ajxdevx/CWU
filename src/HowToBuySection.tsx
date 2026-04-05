import { Copy } from 'lucide-react'

/** Wider than the leadership carousel so steps stay left-aligned on large viewports */
const SECTION_ROW_MAX = 'max-w-[1808px]'
const SECTION_GUTTER = 'px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-20'

const STEPS = [
  {
    n: '01',
    title: 'Create a wallet',
    body: 'Download Phantom or Solflare — the recommended Solana wallets for purchasing CWU.',
  },
  {
    n: '02',
    title: 'Add SOL',
    body: 'Transfer SOL to your wallet from an exchange like Coinbase, Binance, or Kraken.',
  },
  {
    n: '03',
    title: 'Visit Jupiter',
    body: 'Go to Jupiter exchange and connect your Solana wallet to begin the swap.',
  },
  {
    n: '04',
    title: 'Swap for $CWU',
    body: 'Paste the CWU contract address and swap your SOL for $CWU. Welcome to the network.',
  },
] as const

const PLACEHOLDER_CONTRACT = 'To be announced at launch'

/** Same as step index numerals (01, 02, …) */
const STEP_ACCENT_CLASS = 'text-[#3CDAC4]'

/** Jupiter aggregator (Solana) */
const JUPITER_URL = 'https://jup.ag'

export default function HowToBuySection() {
  const copyAddress = () => {
    void navigator.clipboard?.writeText(PLACEHOLDER_CONTRACT)
  }

  return (
    <section
      id="how-to-buy"
      className="box-border w-full min-w-0 shrink-0 overflow-x-hidden scroll-mt-28 border border-[#DDDDDD] bg-white lg:min-h-[1013px]"
      aria-labelledby="how-to-buy-heading"
    >
      <div className={`flex h-full min-h-0 flex-col ${SECTION_GUTTER}`}>
        <div className={`mx-auto flex h-full min-h-0 w-full ${SECTION_ROW_MAX} flex-col py-10 sm:py-12 lg:py-14`}>
          <header className="shrink-0">
            <p className="m-0 font-['DM_Sans',sans-serif] text-xl font-semibold leading-[1.2] tracking-[1.8px] text-[#6B7280] sm:text-2xl">
              Get Started
            </p>
            <h2
              id="how-to-buy-heading"
              className="mt-3 font-[Georgia,serif] text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.1] tracking-[0] text-[#111111] sm:mt-4"
            >
              How to buy $CWU
            </h2>
          </header>

          <ol className="mt-8 flex min-h-0 list-none flex-col justify-start gap-0 divide-y divide-[#777777]/50 p-0 sm:mt-10 lg:min-h-0 lg:flex-1 lg:justify-evenly">
            {STEPS.map(({ n, title, body }) => (
              <li
                key={n}
                className="flex min-w-0 flex-col gap-3 py-6 sm:flex-row sm:items-start sm:gap-x-6 sm:py-10 md:py-12 md:gap-x-8"
              >
                <div className="flex min-w-0 w-full shrink-0 flex-row items-center justify-start gap-[10px] sm:w-[min(100%,28rem)] md:max-w-[30rem]">
                  <span className="inline-flex w-9 shrink-0 justify-end font-['DM_Sans',sans-serif] text-lg font-semibold tabular-nums leading-none text-[#3CDAC4] sm:w-12 sm:text-xl">
                    {n}
                  </span>
                  <h3 className="m-0 min-w-0 flex-1 text-left font-[Georgia,serif] text-[clamp(1.375rem,2.5vw+0.75rem,2.5rem)] font-normal leading-[1.2] tracking-normal text-[#111111]">
                    {title}
                  </h3>
                </div>
                <div className="min-w-0 flex-1 basis-0 max-[799px]:pl-0 sm:max-[1274px]:pl-40 min-[1275px]:pl-24 md:min-[1275px]:pl-40 lg:min-[1275px]:pl-52 xl:min-[1275px]:pl-64 2xl:min-[1275px]:pl-72">
                  <p className="m-0 max-w-[643px] text-left font-['DM_Sans',sans-serif] text-[clamp(1rem,3.8vw,1.375rem)] font-normal leading-[1.25] tracking-normal text-[#777777] sm:text-[clamp(1.0625rem,2.2vw,1.5rem)] lg:text-2xl lg:leading-[1.1]">
                    {n === '03' ? (
                      <>
                        Go to{' '}
                        <a
                          href={JUPITER_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${STEP_ACCENT_CLASS} rounded-sm underline decoration-[#3CDAC4]/60 underline-offset-[0.15em] transition-[text-decoration-color,opacity] hover:decoration-[#3CDAC4] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D4A9C]`}
                        >
                          Jupiter
                        </a>{' '}
                        exchange and connect your Solana wallet to begin the swap.
                      </>
                    ) : (
                      body
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <footer className="mt-auto shrink-0 pt-5 pb-6 sm:pt-10 sm:pb-12 lg:pb-0">
            <div className="flex flex-col items-start gap-2 sm:gap-3">
              <p className="m-0 shrink-0 text-left font-['DM_Sans',sans-serif] text-xl font-bold leading-[1.2] tracking-[1.5px] text-[#999999]">
                Contract Address
              </p>
              <div className="box-border flex w-fit max-w-full items-center gap-[10px] rounded-[10px] border border-[#DDDDDD] bg-[#F7F5F0] px-5 py-3">
                <span className="min-w-0 font-['DM_Sans',sans-serif] text-xl font-normal leading-[1.2] tracking-normal text-[#444444] sm:whitespace-nowrap">
                  {PLACEHOLDER_CONTRACT}
                </span>
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center justify-center rounded-md p-1.5 text-[#374151] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D4A9C]"
                  aria-label="Copy contract address"
                  onClick={copyAddress}
                >
                  <Copy className="size-4 sm:size-[18px]" strokeWidth={2} aria-hidden />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  )
}
