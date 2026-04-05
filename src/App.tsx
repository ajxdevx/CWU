import { useLayoutEffect } from 'react'
import CommonwealthSection from './CommonwealthSection'
import Header from './Header'
import Hero from './Hero'
import HeroFoldBackground from './HeroFoldBackground'
import HowToBuySection from './HowToBuySection'
import LeadershipSection from './LeadershipSection'
import NetworkSection from './NetworkSection'
import FAQSection from './FAQSection'
import Footer from './Footer'
import JoinCommunitySection from './JoinCommunitySection'
import RoadmapSection from './RoadmapSection'
import SectionReveal from './SectionReveal'
import SeoFaqJsonLd from './SeoFaqJsonLd'

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
      {/*
        Header + hero stay outside SectionReveal so the fold is never opacity-0 / IO-gated:
        header and hero entrance animations stay in hero CSS only.
      */}
      <div className="cwu-hero-fold-stack relative flex w-full min-w-0 shrink-0 flex-col overflow-x-clip overflow-y-visible">
        <HeroFoldBackground />
        <div className="relative z-10 flex min-w-0 flex-col">
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
