import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } }
  });

  return (
    <div className="container py-12">
      <Link href="/admin" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        В панель
      </Link>

      <h1 className="text-4xl font-black mb-12 tracking-tighter uppercase">Заказы</h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border-2 border-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between flex-wrap gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Заказ #{order.id.slice(-6)}</p>
                <h2 className="font-black text-2xl tracking-tight">{order.customerName}</h2>
                <p className="text-sm text-slate-500 font-bold mt-1">{order.customerPhone}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{new Date(order.createdAt).toLocaleString('ru-RU')}</p>
                <p className="text-3xl font-black text-blue-600 tracking-tighter">{order.totalAmount.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">ТОВАРЫ В ЗАКАЗЕ</h3>
                <ul className="space-y-3">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-900">{item.product.title} <span className="text-slate-400 ml-2 font-black italic">× {item.quantity}</span></span>
                      <span className="font-black text-slate-900">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                    </li>
                  ))}
                </ul>
              </div>
              {order.deliveryAddress && (
                <div className="md:border-l md:pl-12 border-slate-50">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">АДРЕС И КОММЕНТАРИЙ</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{order.deliveryAddress}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-black uppercase tracking-[0.2em]">Заказов пока нет.</p>
          </div>
        )}
      </div>
    </div>
  );
}
