"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { Plus } from "lucide-react";

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
    <div className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:border-blue-600 transition-all duration-300">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square bg-slate-50 flex items-center justify-center p-8">
           <div className="w-full h-full border border-slate-100 rounded-2xl flex items-center justify-center bg-white text-[10px] text-slate-300 italic text-center p-4">
            {product.title}
          </div>
        </div>
      </Link>

      <div className="p-8 pt-0">
        <div className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-black mb-2">
          {product.category.name}
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-4 tracking-tight">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 disabled:bg-slate-200 disabled:text-slate-400 group-active:scale-95"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
