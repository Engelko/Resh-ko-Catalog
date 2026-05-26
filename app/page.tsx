import prisma from "@/lib/prisma";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

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
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <h2 className="text-[10px] font-black mb-6 uppercase tracking-[0.2em] text-slate-400">Категории</h2>
          <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-1 no-scrollbar">
            <Link
              href="/"
              className={`whitespace-nowrap px-4 py-3 rounded-xl text-sm transition-all duration-200 border ${!categorySlug ? 'bg-slate-900 border-slate-900 text-white font-bold' : 'bg-white border-transparent text-slate-600 hover:bg-slate-100'}`}
            >
              Все товары
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/?category=${cat.slug}`}
                className={`whitespace-nowrap px-4 py-3 rounded-xl text-sm transition-all duration-200 border ${categorySlug === cat.slug ? 'bg-slate-900 border-slate-900 text-white font-bold' : 'bg-white border-transparent text-slate-600 hover:bg-slate-100'}`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 mb-2">
                <Link href="/" className="hover:text-blue-600">Магазин</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-900 font-bold">
                  {categorySlug ? categories.find(c => c.slug === categorySlug)?.name : 'Каталог'}
                </span>
              </nav>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                {categorySlug ? categories.find(c => c.slug === categorySlug)?.name : 'ФУРНИТУРА ДЛЯ КЕЙСОВ'}
              </h1>
            </div>
            <p className="text-sm font-bold text-slate-400">{products.length} ТОВАРОВ</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed">
              <p className="text-slate-500 font-medium tracking-tight">В этой категории пока нет товаров.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
