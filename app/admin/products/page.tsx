import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, ArrowLeft } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { title: 'asc' },
  });

  return (
    <div className="container py-12">
      <Link href="/admin" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        В панель
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Товары</h1>
        <div className="flex items-center gap-4">
          <Link href="/admin/products/new" className="bg-slate-900 text-white hover:bg-blue-600 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Добавить товар
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">
                <th className="px-8 py-5">Название</th>
                <th className="px-8 py-5">Категория</th>
                <th className="px-8 py-5">Цена</th>
                <th className="px-8 py-5">Остаток</th>
                <th className="px-8 py-5 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6 font-bold text-slate-900">{product.title}</td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-medium">{product.category.name}</td>
                  <td className="px-8 py-6 font-black text-lg">{product.price.toLocaleString('ru-RU')} ₽</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'}`}>
                      {product.stock} шт.
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors bg-white border border-slate-100 rounded-xl"
                      >
                        <Edit className="w-4 h-4" />
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
