import prisma from "@/lib/prisma";
import Link from "next/link";
import { Package, ShoppingCart } from "lucide-react";

export default async function AdminDashboardPage() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Панель</h1>
        <div className="flex gap-3">
           <Link href="/admin/products" className="bg-white border-2 border-slate-100 hover:border-slate-900 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
            Товары
           </Link>
           <Link href="/admin/orders" className="bg-slate-900 text-white hover:bg-blue-600 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-slate-200">
            Заказы
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-10 flex items-center gap-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl text-blue-600 flex items-center justify-center">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Всего товаров</p>
            <p className="text-5xl font-black tracking-tighter">{productsCount}</p>
          </div>
        </div>
        <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-10 flex items-center gap-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-green-50 rounded-2xl text-green-600 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Всего заказов</p>
            <p className="text-5xl font-black tracking-tighter">{ordersCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.2em]">Последние заказы</h2>
          <Link href="/admin/orders" className="text-xs font-bold text-blue-600 hover:underline">ВСЕ ЗАКАЗЫ</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">
                <th className="px-8 py-5">Клиент</th>
                <th className="px-8 py-5">Дата</th>
                <th className="px-8 py-5">Сумма</th>
                <th className="px-8 py-5">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6 font-bold text-slate-900">{order.customerName}</td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                    {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-8 py-6 font-black text-lg">{order.totalAmount.toLocaleString('ru-RU')} ₽</td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">Новый</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
