"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { Plus, Box } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    price: number;
    imageUrl: string;
    stock: number;
    category: {
      name: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square bg-slate-50 overflow-hidden flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
             <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl">
               <Box className="w-5 h-5 text-slate-900" />
             </div>
          </div>
        </div>
      </Link>

      <div className="p-8">
        <div className="flex items-center gap-2 mb-4">
           <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
           <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">
            {product.category.name}
          </span>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem] mb-6 tracking-tight leading-tight">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Цена</p>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="bg-slate-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 disabled:bg-slate-100 disabled:text-slate-300 active:scale-95 shadow-xl shadow-slate-200 hover:shadow-blue-500/20"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
