import { useCart } from '../../context/CartContext'

export default function MengenAuswahl({ produkt, menge, kompakt = false }) {
  const { mengeAendern, artikelEntfernen } = useCart()

  const minus = () => {
    if (menge <= 1) artikelEntfernen(produkt.id)
    else mengeAendern(produkt.id, menge - 1)
  }

  const plus = () => mengeAendern(produkt.id, menge + 1)

  const btnKlasse = kompakt
    ? 'w-7 h-7 text-sm font-bold rounded-full flex items-center justify-center border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-colors'
    : 'w-8 h-8 text-base font-bold rounded-full flex items-center justify-center border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-colors'

  return (
    <div className="flex items-center gap-1">
      <button onClick={minus} className={btnKlasse} aria-label="Menge verringern">−</button>
      <span className={`${kompakt ? 'w-6 text-sm' : 'w-8 text-sm'} text-center font-semibold`}>{menge}</span>
      <button onClick={plus} className={btnKlasse} aria-label="Menge erhöhen">+</button>
    </div>
  )
}
