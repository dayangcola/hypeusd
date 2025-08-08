import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Stats } from '@/components/landing/stats'
import { RiskManagement } from '@/components/landing/risk-management'
import { CTA } from '@/components/landing/cta'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <RiskManagement />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
