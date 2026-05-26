import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="container py-12 max-w-5xl">
      <Link href="/admin/products" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        К товарам
      </Link>

      <h1 className="text-4xl font-black mb-12 tracking-tighter uppercase">Добавить товар</h1>

      <ProductForm categories={categories} />
    </div>
  );
}
