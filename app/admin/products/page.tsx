import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, ArrowLeft, MoreHorizontal } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { title: 'asc' },
  });

  return (
    <div className="container py-12">
      <Link href="/admin" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Вернуться в панель
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Управление ассортиментом</p>
          <h1 className="text-5xl font-black tracking-tighter uppercase text-slate-900">Товары</h1>
        </div>
        <Link href="/admin/products/new" className="bg-slate-900 text-white hover:bg-blue-600 px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95">
          <Plus className="w-5 h-5" />
          Добавить новый товар
        </Link>
      </div>

      <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-50/50">
                <th className="px-10 py-6">Товар</th>
                <th className="px-10 py-6">Категория</th>
                <th className="px-10 py-6">Цена</th>
                <th className="px-10 py-6">Склад</th>
                <th className="px-10 py-6 text-right">Управление</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/30 transition-all duration-300">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-black text-slate-900 uppercase tracking-tight text-lg">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-10 py-8 font-black text-xl text-slate-900 tracking-tighter">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col gap-1">
                      <span className={`text-sm font-black uppercase tracking-wider ${product.stock < 10 ? 'text-red-500' : 'text-slate-900'}`}>
                        {product.stock} шт.
                      </span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${product.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white hover:border-blue-100 transition-all bg-slate-50 border border-transparent rounded-2xl"
                        title="Редактировать"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <DeleteProductButton id={product.id} />
                    </div>
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
