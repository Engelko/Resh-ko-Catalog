import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-lg font-bold text-slate-900 mb-4">FLIGHTCASE HUB</h2>
            <p className="text-slate-500 text-sm max-w-xs">
              Профессиональная фурнитура для производства кофров, кейсов и рэковых стоек. Прямые поставки от производителей.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Магазин</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-blue-600">Каталог</Link></li>
              <li><Link href="/delivery" className="hover:text-blue-600">Доставка</Link></li>
              <li><Link href="/payment" className="hover:text-blue-600">Оплата</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Компания</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/about" className="hover:text-blue-600">О нас</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Контакты</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Политика</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} FlightCase Hub. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
