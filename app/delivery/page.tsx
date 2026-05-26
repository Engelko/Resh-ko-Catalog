import { Truck, Package, Globe, ShieldCheck } from "lucide-react";

export default function DeliveryPage() {
  const steps = [
    { icon: Package, title: "СБОРКА ЗАКАЗА", desc: "Комплектуем ваш заказ в течение 1 рабочего дня после оплаты." },
    { icon: Truck, title: "ОТПРАВКА", desc: "Передаем груз в транспортную компанию или курьерскую службу." },
    { icon: Globe, title: "ДОСТАВКА", desc: "Доставка по всей России и странам СНГ ведущими перевозчиками." },
    { icon: ShieldCheck, title: "ПОЛУЧЕНИЕ", desc: "Вы получаете товар в целости и сохранности с полным пакетом документов." }
  ];

  return (
    <div className="container py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black tracking-tight mb-4">ДОСТАВКА</h1>
        <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Мы доставляем фурнитуру быстро и надежно</p>
      </div>

      <div className="grid gap-12">
        <div className="grid sm:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] hover:border-blue-100 transition-all">
              <step.icon className="w-10 h-10 text-blue-600 mb-6" />
              <h3 className="text-lg font-black mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-slate-900 rounded-[3rem] p-12 text-white">
          <h2 className="text-2xl font-black mb-8">СПОСОБЫ ДОСТАВКИ</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 font-bold text-blue-400">01</div>
              <div>
                <h4 className="font-bold mb-1">Транспортные компании (СДЭК, ПЭК, Деловые Линии)</h4>
                <p className="text-slate-400 text-sm">Самый популярный способ для доставки по РФ. Оплата услуг ТК при получении.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 font-bold text-blue-400">02</div>
              <div>
                <h4 className="font-bold mb-1">Курьерская доставка по Москве</h4>
                <p className="text-slate-400 text-sm">Осуществляется в пределах МКАД на следующий рабочий день после заказа.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 font-bold text-blue-400">03</div>
              <div>
                <h4 className="font-bold mb-1">Самовывоз со склада</h4>
                <p className="text-slate-400 text-sm">Бесплатно. Москва, ул. Производственная, д. 42. По предварительному согласованию.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
