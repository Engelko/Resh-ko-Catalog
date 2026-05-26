"use client";

import { useCartStore } from "@/lib/store";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="bg-slate-50 border border-dashed rounded-[3rem] p-16 max-w-lg mx-auto">
          <ShoppingBag className="w-16 h-16 mx-auto text-slate-200 mb-8" />
          <h1 className="text-3xl font-black mb-4 tracking-tight uppercase">Корзина пуста</h1>
          <p className="text-slate-500 mb-10 font-medium">Похоже, вы еще ничего не выбрали. Начните с нашего каталога!</p>
          <Link href="/" className="inline-flex items-center justify-center bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-black mb-12 tracking-tighter uppercase">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:items-center sm:flex-row gap-6 p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-[8px] text-slate-300 italic border border-slate-100 p-2 text-center font-bold uppercase tracking-widest leading-tight">
                {item.title}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">{item.title}</h3>
                <p className="text-blue-600 font-black text-lg">{item.price.toLocaleString('ru-RU')} ₽</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center border-2 border-slate-50 rounded-xl bg-white h-12 px-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-lg text-slate-400"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-black tabular-nums">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-lg text-slate-400"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors bg-slate-50 rounded-xl"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 sticky top-24 shadow-2xl shadow-slate-200">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-slate-400">ВАШ ЗАКАЗ</h2>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500">Товары ({getTotalItems()} шт.)</span>
                <span>{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500">Доставка</span>
                <span className="text-green-400 uppercase tracking-widest">Бесплатно</span>
              </div>
              <div className="border-t border-slate-800 pt-6 flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 pb-1">Итого</span>
                <span className="text-4xl font-black tracking-tighter text-blue-400">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/40"
            >
              Оформить
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
