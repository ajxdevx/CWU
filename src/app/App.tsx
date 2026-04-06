import { useLayoutEffect } from 'react'
import GlobeTricolorDitherDefs from '@/components/GlobeTricolorDitherDefs'
import SectionReveal from '@/components/SectionReveal'
import Header from '@/layout/Header'
import CommonwealthSection from '@/sections/CommonwealthSection'
import FAQSection from '@/sections/FAQSection'
import Footer from '@/sections/Footer'
import HowToBuySection from '@/sections/HowToBuySection'
import JoinCommunitySection from '@/sections/JoinCommunitySection'
import LeadershipSection from '@/sections/LeadershipSection'
import NetworkSection from '@/sections/NetworkSection'
import RoadmapSection from '@/sections/RoadmapSection'
import Hero from '@/sections/hero/Hero'
import HeroFoldBackground from '@/sections/hero/HeroFoldBackground'
import SeoFaqJsonLd from '@/seo/SeoFaqJsonLd'

function App() {
  useLayoutEffect(() => {
    const root = document.getElementById('root')
    if (!root) return

    const applyHashScroll = () => {
      const slug = window.location.hash.replace(/^#/, '')
      if (!slug) {
        root.scrollTop = 0
        requestAnimationFrame(() => {
          root.scrollTop = 0
        })
        return
      }

      const id = decodeURIComponent(slug)
      const el = document.getElementById(id)
      if (!el) return

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    }

    applyHashScroll()
    window.addEventListener('hashchange', applyHashScroll)
    return () => window.removeEventListener('hashchange', applyHashScroll)
  }, [])

  return (
    <div className="app-root relative flex min-h-min w-full min-w-0 max-w-full flex-col">
      <GlobeTricolorDitherDefs />
      <div className="cwu-hero-fold-stack relative flex w-full min-w-0 shrink-0 flex-col overflow-x-clip overflow-y-visible max-[800px]:overflow-x-visible max-[1274px]:min-h-[100svh] max-[1274px]:min-h-[100dvh]">
        <HeroFoldBackground />
        <div className="relative z-10 flex min-h-0 w-full min-w-0 flex-col max-[1274px]:min-h-0 max-[1274px]:flex-1">
          <Header />
          <Hero />
        </div>
      </div>
      <SectionReveal surfaceClassName="bg-white" className="w-full min-w-0">
        <NetworkSection />
      </SectionReveal>
      <SectionReveal surfaceClassName="bg-[#F7F5F0]" className="w-full min-w-0">
        <CommonwealthSection />
      </SectionReveal>
      <SectionReveal surfaceClassName="bg-[#FAF9F6]" className="w-full min-w-0">
        <LeadershipSection />
      </SectionReveal>
      <SectionReveal surfaceClassName="bg-white" className="w-full min-w-0">
        <HowToBuySection />
      </SectionReveal>
      <SectionReveal surfaceClassName="bg-[#F7F5F0]" className="w-full min-w-0">
        <RoadmapSection />
      </SectionReveal>
      <SectionReveal surfaceClassName="bg-white" className="w-full min-w-0">
        <FAQSection />
      </SectionReveal>
      <SectionReveal surfaceClassName="bg-[#F7F5F0]" className="w-full min-w-0">
        <JoinCommunitySection />
      </SectionReveal>
      <SectionReveal surfaceClassName="bg-[#0A1628]" className="w-full min-w-0">
        <Footer />
      </SectionReveal>
      <SeoFaqJsonLd />
    </div>
  )
}

export default App
