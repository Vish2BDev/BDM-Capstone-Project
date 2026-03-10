import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import BusinessContext from '@/components/BusinessContext'
import FiveProblems from '@/components/FiveProblems'
import Methodology from '@/components/Methodology'
import AnalysisSection from '@/components/AnalysisSection'
import Strategy from '@/components/Strategy'
import FinancialImpact from '@/components/FinancialImpact'
import ProofSection from '@/components/ProofSection'
import ProjectJourney from '@/components/ProjectJourney'
import Downloads from '@/components/Downloads'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <BusinessContext />
        <FiveProblems />
        <Methodology />
        <AnalysisSection />
        <Strategy />
        <FinancialImpact />
        <ProofSection />
        <ProjectJourney />
        <Downloads />
      </main>
      <Footer />
    </>
  )
}
