"use client";

import { useCartStore } from "@/lib/store";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    stock: number;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-4">
      <div className="flex items-center justify-between border-2 border-slate-100 rounded-2xl bg-white h-16 px-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-12 h-12 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-900"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center font-black text-xl tabular-nums">{quantity}</span>
        <button
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          className="w-12 h-12 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-900"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        className="flex-grow bg-slate-900 hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-black h-16 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 text-lg uppercase tracking-widest shadow-xl shadow-slate-200"
      >
        <ShoppingCart className="w-5 h-5" />
        В корзину
      </button>
    </div>
  );
}
