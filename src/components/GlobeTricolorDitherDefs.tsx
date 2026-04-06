import { useLayoutEffect, useRef } from 'react'

const R = [1 / 255, 32 / 255, 114 / 255] as const
const G = [71 / 255, 115 / 255, 200 / 255] as const
const B = [120 / 255, 168 / 255, 255 / 255] as const

/** 4×4 ordered-dither tile (matches CodePen / threshold-map style). */
const DITHER_TILE_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA5ElEQVQYlQXBgQbCUABA0fdrk0ySSZJJkiRJMjOTTGZmkiRJZiYzyczMzGQmfdrtHPH7/TgcDuR5zna7pWka9vs9aZqyXq8R0+mU5/OJoihcLhfG4zFBENDtdjmdToj3+81yueTz+WCaJnEcM5/PKcsSXdcRsizjeR6j0YjH40Gr1cJxHAaDAbfbDVHXNbvdjiRJWK1WfL9fLMsiyzI2mw1CVVV836fT6XA8HplMJoRhSK/X43w+I6IoYbabURQFmqbxer1YLBZUVYVhGAhJkrBtm36/z/V6pd1u47ouw+GQ+/3OH4/Fn8FvF/NxAAAAAElFTkSuQmCC'

export const GLOBE_TRICOLOR_FILTER_ID = 'cwu-globe-tricolor-dither'

export default function GlobeTricolorDitherDefs() {
  const feImageGlobeRef = useRef<SVGFEImageElement>(null)

  useLayoutEffect(() => {
    const syncTileSize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      const globe = feImageGlobeRef.current
      if (globe) {
        const size = 8 / dpr
        globe.setAttribute('width', String(size))
        globe.setAttribute('height', String(size))
      }
    }

    syncTileSize()
    window.addEventListener('resize', syncTileSize)
    return () => window.removeEventListener('resize', syncTileSize)
  }, [])

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id={GLOBE_TRICOLOR_FILTER_ID}
          colorInterpolationFilters="sRGB"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <feFlood floodColor="#000000" floodOpacity="0.5" x="0%" y="0%" result="floodGlob" />
          <feBlend mode="normal" x="0%" y="0%" in="SourceGraphic" in2="floodGlob" result="blendGlob1" />
          <feImage
            ref={feImageGlobeRef}
            href={DITHER_TILE_PNG}
            x="0"
            y="0"
            width="4"
            height="4"
            result="imageGlob"
          />
          <feTile x="0" y="0" in="imageGlob" result="tileGlob" />
          <feBlend mode="overlay" x="0%" y="0%" in="blendGlob1" in2="tileGlob" result="blendGlob2" />
          <feColorMatrix in="blendGlob2" type="saturate" values="0" result="grayGlob" />
          <feComponentTransfer in="grayGlob" result="tricolorGlob">
            <feFuncR
              type="discrete"
              tableValues={`${R[0]} ${R[1]} ${R[2]}`}
            />
            <feFuncG
              type="discrete"
              tableValues={`${G[0]} ${G[1]} ${G[2]}`}
            />
            <feFuncB
              type="discrete"
              tableValues={`${B[0]} ${B[1]} ${B[2]}`}
            />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  )
}
