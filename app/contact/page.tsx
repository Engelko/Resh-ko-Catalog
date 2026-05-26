import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">КОНТАКТЫ</h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs">Мы всегда на связи, чтобы помочь вам с выбором</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100">
              <Phone className="w-6 h-6 text-blue-600 mb-4" />
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Телефон</div>
              <div className="font-bold">+7 (495) 000-00-00</div>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100">
              <Mail className="w-6 h-6 text-blue-600 mb-4" />
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</div>
              <div className="font-bold">info@fcasehub.ru</div>
            </div>
          </div>

          <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 flex items-start gap-6">
            <MapPin className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Адрес</div>
              <div className="font-bold leading-relaxed">г. Москва, ул. Производственная, д. 42, складской комплекс &quot;Технопарк&quot;</div>
            </div>
          </div>

          <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 flex items-start gap-6">
            <Clock className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">График работы</div>
              <div className="font-bold leading-relaxed">
                Пн–Пт: 10:00 – 19:00<br/>
                Сб–Вс: Выходной
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-black">НАПИШИТЕ НАМ</h2>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Ваше имя</label>
              <input type="text" className="w-full bg-slate-800 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none font-bold" placeholder="Иван Иванов" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Email или Телефон</label>
              <input type="text" className="w-full bg-slate-800 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none font-bold" placeholder="example@mail.ru" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Сообщение</label>
              <textarea rows={4} className="w-full bg-slate-800 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none font-bold resize-none" placeholder="Задайте ваш вопрос..."></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-widest transition-all">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
