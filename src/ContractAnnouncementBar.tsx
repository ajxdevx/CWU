import { Copy } from 'lucide-react'
import { useCallback, useState } from 'react'

const COPY_TEXT = 'Contract to be announced at launch'

export default function ContractAnnouncementBar() {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(COPY_TEXT)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])

  return (
    <div className="mt-0 flex w-full max-w-full flex-nowrap flex-row items-stretch gap-2 max-[360px]:gap-1.5 max-[1259px]:max-w-[min(100%,calc(100vw-1.25rem))] min-[1260px]:mt-2 min-[1260px]:gap-2.5 min-[1260px]:w-max min-[1260px]:max-w-[min(100%,calc(100vw-2.5rem))]">
      <div className="box-border flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-[10px] border-[1.31px] border-solid border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-2 py-2.5 max-[360px]:px-2 sm:px-3 min-[1260px]:w-max min-[1260px]:flex-none min-[1260px]:px-4 min-[1260px]:py-3">
        <p className="m-0 w-full min-w-0 whitespace-nowrap text-center font-['DM_Sans',sans-serif] text-[clamp(9px,3.35vw,16px)] font-normal leading-[125%] tracking-[-0.02em] text-[#FFFFFF] min-[1260px]:leading-[120%] min-[1260px]:tracking-normal">
          {COPY_TEXT}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? 'Copied' : 'Copy'}
        aria-label={copied ? 'Copied to clipboard' : 'Copy contract notice to clipboard'}
        className="box-border flex w-10 min-w-10 shrink-0 items-center justify-center self-stretch rounded-[10px] bg-[#3CDAC4] text-white transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFFFF] min-[1260px]:w-11 min-[1260px]:min-w-11"
      >
        <Copy className="size-5" strokeWidth={2} aria-hidden />
      </button>
    </div>
  )
}
