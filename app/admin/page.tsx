import prisma from "@/lib/prisma";
import Link from "next/link";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">
          <TrendingUp className="w-4 h-4" /> Аналитика системы
        </div>
        <h1 className="text-5xl font-black tracking-tighter uppercase text-slate-900">Дашборд</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Package className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Товары</p>
          <p className="text-4xl font-black tracking-tighter text-slate-900">{productsCount}</p>
          <Link href="/admin/products" className="mt-4 inline-flex text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">Управление</Link>
        </div>

        <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Заказы</p>
          <p className="text-4xl font-black tracking-tighter text-slate-900">{ordersCount}</p>
          <Link href="/admin/orders" className="mt-4 inline-flex text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">Просмотр</Link>
        </div>

        <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 opacity-50">
          <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Выручка</p>
          <p className="text-4xl font-black tracking-tighter text-slate-900">0 ₽</p>
          <span className="mt-4 block text-[10px] font-black text-slate-300 uppercase tracking-widest">В разработке</span>
        </div>

        <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 opacity-50">
          <div className="w-14 h-14 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Клиенты</p>
          <p className="text-4xl font-black tracking-tighter text-slate-900">0</p>
          <span className="mt-4 block text-[10px] font-black text-slate-300 uppercase tracking-widest">В разработке</span>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Последние заказы</h2>
          <Link href="/admin/orders" className="text-[10px] font-black text-blue-600 hover:text-slate-900 uppercase tracking-widest transition-colors">Посмотреть все</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-50/50">
                <th className="px-10 py-6">Клиент</th>
                <th className="px-10 py-6">Дата</th>
                <th className="px-10 py-6">Сумма</th>
                <th className="px-10 py-6">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">
                    Заказы отсутствуют
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/30 transition-all duration-300">
                    <td className="px-10 py-8 font-black text-slate-900 uppercase tracking-tight">{order.customerName}</td>
                    <td className="px-10 py-8 text-xs text-slate-500 font-black uppercase tracking-wider">
                      {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-10 py-8 font-black text-xl text-slate-900 tracking-tighter">
                      {order.totalAmount.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="px-10 py-8">
                      <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Новый</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
