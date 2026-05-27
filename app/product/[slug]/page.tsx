import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { ArrowLeft, Truck, Shield } from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-12">
      <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        КАТАЛОГ
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Product Image */}
        <div className="aspect-square bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col py-4">
          <div className="mb-8">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">{product.category.name}</span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 text-slate-900 tracking-tight leading-none">{product.title}</h1>
          </div>

          <div className="text-5xl font-black text-slate-900 mb-10 tracking-tighter">
            {product.price.toLocaleString('ru-RU')} ₽
          </div>

          <div className="mb-10 max-w-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">ОПИСАНИЕ</h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="mb-10">
             <div className={`inline-flex items-center text-sm font-black uppercase tracking-widest ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-600 mr-3 animate-pulse" />
                    В наличии ({product.stock} шт.)
                  </>
                ) : 'Нет в наличии'}
             </div>
          </div>

          <div className="max-w-md">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-slate-100 pt-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-900 border border-slate-100">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider mb-1">Доставка</h4>
                <p className="text-xs text-slate-500 font-medium">Отправка в день заказа по всей России</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-900 border border-slate-100">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider mb-1">Гарантия</h4>
                <p className="text-xs text-slate-500 font-medium">Проверка качества каждой детали</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
