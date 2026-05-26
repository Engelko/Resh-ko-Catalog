import Link from "next/link";
import { Info, History, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-16 max-w-4xl">
      <div className="text-center mb-16">
        <div className="inline-flex p-4 bg-blue-50 rounded-3xl text-blue-600 mb-6">
          <Info className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">О КОМПАНИИ</h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs">Профессиональные решения для транспортировки оборудования</p>
      </div>

      <div className="grid gap-16">
        <section className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">
              <History className="w-4 h-4" /> Наша история
            </div>
            <h2 className="text-3xl font-black">С чего мы начинали</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              FlightCase Hub был основан в 2015 году группой профессионалов в области сценического оборудования.
              Мы столкнулись с проблемой нехватки качественной фурнитуры на локальном рынке и решили взять ситуацию в свои руки.
            </p>
          </div>
          <div className="flex-1 w-full aspect-video bg-slate-100 rounded-[3rem] border-2 border-slate-50 flex items-center justify-center">
             <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Фото офиса/склада</span>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
            <div className="inline-flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
              <Target className="w-4 h-4" /> Наша миссия
            </div>
            <h3 className="text-2xl font-black mb-4">Качество и надежность</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              Обеспечить производителей кейсов и рэковых стоек лучшей мировой фурнитурой, чтобы оборудование наших клиентов оставалось в безопасности в любых условиях туров и перелетов.
            </p>
          </div>
          <div className="p-10 bg-blue-600 rounded-[3rem] text-white">
            <div className="inline-flex items-center gap-2 text-blue-200 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
              <Users className="w-4 h-4" /> Наша команда
            </div>
            <h3 className="text-2xl font-black mb-4">Экспертный подход</h3>
            <p className="text-blue-100 font-medium leading-relaxed">
              В нашей команде работают инженеры и логисты с многолетним опытом. Мы не просто продаем детали, мы помогаем подобрать оптимальное решение для каждого конкретного случая.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-20 text-center">
        <Link href="/" className="inline-flex bg-slate-100 hover:bg-slate-200 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">
          Перейти в каталог
        </Link>
      </div>
    </div>
  );
}
