import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="container py-12 max-w-5xl">
      <Link href="/admin/products" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        К товарам
      </Link>

      <h1 className="text-4xl font-black mb-12 tracking-tighter uppercase">Редактировать товар</h1>

      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}
