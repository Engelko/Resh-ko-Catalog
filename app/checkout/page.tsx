"use client";

import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { submitOrder } from "@/app/actions/order";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (success) {
    return (
      <div className="container py-20 text-center">
        <div className="bg-white border-2 border-slate-50 rounded-[3rem] p-16 max-w-lg mx-auto shadow-sm">
          <CheckCircle2 className="w-20 h-20 mx-auto text-green-500 mb-8" />
          <h1 className="text-3xl font-black mb-4 tracking-tight uppercase">Заказ оформлен!</h1>
          <p className="text-slate-500 mb-10 font-medium">
            Спасибо за ваш заказ. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей доставки.
          </p>
          <Link href="/" className="inline-flex items-center justify-center bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
            Вернуться в магазин
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitOrder(formData, items);

    if (result.success) {
      clearCart();
      setSuccess(true);
    } else {
      setError(result.error || "Произошла ошибка");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12 max-w-5xl">
      <Link href="/cart" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        В корзину
      </Link>

      <h1 className="text-4xl font-black mb-12 tracking-tighter uppercase">Оформление</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-10 shadow-sm space-y-6">
              <div>
                <label htmlFor="customerName" className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">
                  Ваше Имя *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  required
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-blue-600 transition-all font-bold"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  required
                  minLength={9}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-blue-600 transition-all font-bold"
                  placeholder="+7 (900) 000-00-00"
                />
              </div>

              <div>
                <label htmlFor="deliveryAddress" className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">
                  Адрес доставки / Комментарий
                </label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-blue-600 transition-all font-medium leading-relaxed"
                  placeholder="Укажите город, адрес и пожелания к заказу"
                ></textarea>
              </div>
            </div>

            {error && (
              <div className="p-6 bg-red-50 text-red-600 rounded-2xl text-sm font-black uppercase tracking-widest border-2 border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
            >
              {isSubmitting ? "Обработка..." : "ПОДТВЕРДИТЬ ЗАКАЗ"}
            </button>
          </form>
        </div>

        <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 h-fit">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-8">ИТОГО К ОПЛАТЕ</h2>
          <div className="space-y-6 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">
                  {item.title} <span className="text-slate-900 font-black ml-2">×{item.quantity}</span>
                </span>
                <span className="font-black">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-6 flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pb-1">Всего</span>
            <span className="text-4xl font-black tracking-tighter text-blue-600">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}
