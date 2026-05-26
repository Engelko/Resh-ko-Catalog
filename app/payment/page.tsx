import { CreditCard, Landmark, Receipt, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
  return (
    <div className="container py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black tracking-tight mb-4">ОПЛАТА</h1>
        <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Прозрачные и удобные способы расчета</p>
      </div>

      <div className="grid gap-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 bg-slate-50 rounded-[3rem] border-2 border-slate-100">
            <Landmark className="w-10 h-10 text-blue-600 mb-6" />
            <h2 className="text-2xl font-black mb-4">БЕЗНАЛИЧНЫЙ РАСЧЕТ</h2>
            <p className="text-slate-500 font-medium leading-relaxed text-sm mb-6">
              Для юридических лиц и ИП. После оформления заказа мы выставим счет на оплату. Все цены включают НДС 20%.
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest">
              <Receipt className="w-4 h-4" /> Полный пакет документов
            </div>
          </div>

          <div className="p-10 bg-slate-50 rounded-[3rem] border-2 border-slate-100">
            <CreditCard className="w-10 h-10 text-blue-600 mb-6" />
            <h2 className="text-2xl font-black mb-4">БАНКОВСКИЕ КАРТЫ</h2>
            <p className="text-slate-500 font-medium leading-relaxed text-sm mb-6">
              Для физических лиц. Оплата онлайн через защищенный шлюз банка после подтверждения наличия товара менеджером.
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Безопасность платежей
            </div>
          </div>
        </div>

        <section className="bg-blue-600 rounded-[3rem] p-12 text-white text-center">
          <h3 className="text-2xl font-black mb-4">НУЖНА КОНСУЛЬТАЦИЯ?</h3>
          <p className="text-blue-100 font-medium mb-8 max-w-lg mx-auto">
            Если у вас возникли вопросы по поводу способов оплаты или вам нужны специальные условия, свяжитесь с нашим финансовым отделом.
          </p>
          <a href="/contact" className="inline-flex bg-slate-900 hover:bg-slate-800 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">
            Связаться с нами
          </a>
        </section>
      </div>
    </div>
  );
}
