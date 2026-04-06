import HeroBanner from '../components/home/HeroBanner'
import EmpfehlungsPills from '../components/catalog/EmpfehlungsPills'
import KategorieGrid from '../components/catalog/KategorieGrid'
import SoFunktionierts from '../components/home/SoFunktionierts'
import FaqAccordion from '../components/home/FaqAccordion'
import ProduktGrid from '../components/catalog/ProduktGrid'
import { PRODUKTE } from '../data/produkte'

const ANGEBOTE = PRODUKTE.filter(p => p.originalPreis !== null)

export default function AbholservicePage() {
  return (
    <div>
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4">
        <EmpfehlungsPills />
        <KategorieGrid />

        {/* Aktuelle Angebote */}
        {ANGEBOTE.length > 0 && (
          <section className="my-8">
            <h2 className="text-xl font-bold text-text-dark mb-4">
              Aktuelle Angebote <span className="text-brand-red">%</span>
            </h2>
            <ProduktGrid produkte={ANGEBOTE} />
          </section>
        )}
      </div>

      <SoFunktionierts />
      <FaqAccordion />
    </div>
  )
}
