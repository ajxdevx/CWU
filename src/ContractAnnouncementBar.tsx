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
    <div className="mt-0 flex w-full max-w-full flex-row items-stretch gap-2.5 max-[1259px]:max-w-[min(100%,calc(100vw-1.25rem))] min-[1260px]:mt-2 min-[1260px]:w-max min-[1260px]:max-w-[min(100%,calc(100vw-2.5rem))]">
      <div className="box-border flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-[10px] border-[1.31px] border-solid border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-2.5 max-[1259px]:px-3.5 min-[1260px]:w-max min-[1260px]:flex-none min-[1260px]:px-4 min-[1260px]:py-3">
        <p className="m-0 w-full min-w-0 text-center font-['DM_Sans',sans-serif] text-[12px] font-normal leading-[130%] text-[#FFFFFF] sm:text-[14px] min-[1260px]:whitespace-nowrap min-[1260px]:text-[16px] min-[1260px]:leading-[120%]">
          {COPY_TEXT}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? 'Copied' : 'Copy'}
        aria-label={copied ? 'Copied to clipboard' : 'Copy contract notice to clipboard'}
        className="box-border flex w-11 shrink-0 items-center justify-center self-stretch rounded-[10px] bg-[#3CDAC4] text-white transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFFFF]"
      >
        <Copy className="size-5" strokeWidth={2} aria-hidden />
      </button>
    </div>
  )
}
