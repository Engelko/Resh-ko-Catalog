"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/app/actions/product";
import { Save } from "lucide-react";
import { Product } from "@prisma/client";

interface ProductFormProps {
  categories: { id: string, name: string }[];
  initialData?: Product;
}

export default function ProductForm({ categories, initialData }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState(initialData?.slug || "");
  const router = useRouter();

  // Transliteration helper
  const transliterate = (text: string) => {
    const ru = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };
    return text.split('').map(char => ru[char.toLowerCase() as keyof typeof ru] || char).join('').replace(/[^a-z0-9]/gi, '-').toLowerCase().replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!initialData) {
      setSlug(transliterate(e.target.value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    let result;
    if (initialData) {
      result = await updateProduct(initialData.id, formData);
    } else {
      result = await createProduct(formData);
    }

    if (result.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert("Ошибка при сохранении");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-10 shadow-sm space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Название товара</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={initialData?.title}
            onChange={handleTitleChange}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-blue-600 transition-all font-bold text-lg"
            placeholder="Например: Замок-бабочка большой"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Slug (ссылка)</label>
          <input
            type="text"
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50/50 focus:outline-none focus:border-blue-600 transition-all font-mono text-xs font-bold"
            placeholder="butterfly-latch-large"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Категория</label>
          <select
            name="categoryId"
            required
            defaultValue={initialData?.categoryId}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-blue-600 transition-all font-bold"
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Цена (₽)</label>
          <input
            type="number"
            name="price"
            required
            min="1"
            step="0.01"
            defaultValue={initialData?.price}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-blue-600 transition-all font-bold text-lg"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Остаток на складе</label>
          <input
            type="number"
            name="stock"
            required
            min="0"
            defaultValue={initialData?.stock}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-blue-600 transition-all font-bold text-lg"
            placeholder="0"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Описание</label>
          <textarea
            name="description"
            required
            rows={5}
            defaultValue={initialData?.description}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-blue-600 transition-all font-medium leading-relaxed"
            placeholder="Подробное описание товара..."
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Изображение</label>
          <div className="mt-2 p-8 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center bg-slate-50/30">
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full text-sm text-slate-500 file:mr-6 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-slate-900 file:text-white hover:file:bg-blue-600 transition-all"
            />
            {initialData?.imageUrl && (
              <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Текущее: {initialData.imageUrl}</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-50 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-900 hover:bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-200 flex items-center gap-3 disabled:bg-slate-200 disabled:text-slate-400"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? "Сохранение..." : "СОХРАНИТЬ ТОВАР"}
        </button>
      </div>
    </form>
  );
}
