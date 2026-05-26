"use client";

import { deleteProduct } from "@/app/actions/product";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProductButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите удалить этот товар? Это действие нельзя отменить.")) {
      setIsDeleting(true);
      await deleteProduct(id);
      router.refresh();
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors bg-white border border-slate-100 rounded-xl disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
