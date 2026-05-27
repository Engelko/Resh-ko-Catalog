import prisma from "@/lib/prisma";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, LayoutGrid, SlidersHorizontal } from "lucide-react";

interface CatalogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  const products = await prisma.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : {},
    include: { category: true },
    orderBy: { title: 'asc' }
  });

  return (
    <div className="container py-12">
      {/* Hero Section / Breadcrumbs */}
      <div className="mb-16">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-6">
          <Link href="/" className="hover:text-blue-600 font-black">Магазин</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-black">
            {categorySlug ? categories.find(c => c.slug === categorySlug)?.name : 'Каталог'}
          </span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-none uppercase">
            {categorySlug ? categories.find(c => c.slug === categorySlug)?.name : 'КАТАЛОГ'}
          </h1>
          <div className="flex items-center gap-4 text-slate-400 font-black text-xs uppercase tracking-widest">
             <LayoutGrid className="w-4 h-4" />
             <span>{products.length} товаров доступно</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-32 space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <SlidersHorizontal className="w-4 h-4 text-slate-900" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Категории</h2>
              </div>
              <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-2 no-scrollbar">
                <Link
                  href="/"
                  className={`whitespace-nowrap px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${!categorySlug ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white border-slate-50 text-slate-400 hover:border-blue-600 hover:text-blue-600 shadow-sm'}`}
                >
                  Все товары
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/?category=${cat.slug}`}
                    className={`whitespace-nowrap px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${categorySlug === cat.slug ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white border-slate-50 text-slate-400 hover:border-blue-600 hover:text-blue-600 shadow-sm'}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden lg:block p-8 bg-blue-600 rounded-[2.5rem] text-white">
               <h3 className="text-xl font-black mb-4 leading-tight uppercase tracking-tight">Нужна помощь с выбором?</h3>
               <p className="text-blue-100 text-xs font-bold leading-relaxed mb-6 uppercase tracking-wider">Наши эксперты помогут подобрать идеальную фурнитуру под ваш проект.</p>
               <Link href="/contact" className="inline-flex bg-white text-blue-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                 Написать нам
               </Link>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
              <Package className="w-16 h-16 text-slate-200 mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">В этой категории пока нет товаров</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Package } from "lucide-react";
