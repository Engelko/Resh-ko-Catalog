export default function PrivacyPage() {
  return (
    <div className="container py-16 max-w-3xl">
      <h1 className="text-4xl font-black tracking-tight mb-8">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h1>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
        <section>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
          <p>
            Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных FlightCase Hub.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">2. КАКИЕ ДАННЫЕ МЫ СОБИРАЕМ</h2>
          <p>Мы можем собирать следующие данные:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Фамилия, Имя, Отчество</li>
            <li>Номер телефона</li>
            <li>Адрес электронной почты</li>
            <li>Адрес доставки товара</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">3. ЦЕЛИ ОБРАБОТКИ</h2>
          <p>
            Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки электронных писем; заключение, исполнение и прекращение гражданско-правовых договоров; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-4">4. ЗАЩИТА ДАННЫХ</h2>
          <p>
            Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.
          </p>
        </section>
      </div>
    </div>
  );
}
