"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isAdmin = pathname?.startsWith("/admin");

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
            FLIGHT<span className="text-blue-600">CASE</span> HUB
          </Link>

          {!isAdmin && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Каталог</Link>
              <Link href="/about" className="hover:text-blue-600 transition-colors">О нас</Link>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">Контакты</Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isAdmin ? (
            <>
              <Link href="/cart" className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {mounted && totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link href="/admin" className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <User className="w-6 h-6" />
              </Link>
            </>
          ) : (
            <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
              Вернуться в магазин
            </Link>
          )}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {!isAdmin && isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b absolute top-16 left-0 w-full animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 gap-4 text-sm font-medium">
            <Link href="/" className="px-4 py-2 hover:bg-slate-50 rounded-lg">Каталог</Link>
            <Link href="/about" className="px-4 py-2 hover:bg-slate-50 rounded-lg">О нас</Link>
            <Link href="/contact" className="px-4 py-2 hover:bg-slate-50 rounded-lg">Контакты</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
