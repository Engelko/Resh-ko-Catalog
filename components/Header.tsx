"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import LogoutButton from "./admin/LogoutButton";

export default function Header() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isAdmin = pathname?.startsWith("/admin");

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex items-center gap-2">
            <div className="bg-slate-900 text-white p-2 rounded-xl group-hover:bg-blue-600 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
              FLIGHT<span className="text-blue-600">CASE</span> HUB
            </span>
          </Link>

          {!isAdmin && (
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <Link href="/" className={`hover:text-slate-900 transition-colors ${pathname === '/' ? 'text-slate-900' : ''}`}>Каталог</Link>
              <Link href="/about" className={`hover:text-slate-900 transition-colors ${pathname === '/about' ? 'text-slate-900' : ''}`}>О нас</Link>
              <Link href="/delivery" className={`hover:text-slate-900 transition-colors ${pathname === '/delivery' ? 'text-slate-900' : ''}`}>Доставка</Link>
              <Link href="/contact" className={`hover:text-slate-900 transition-colors ${pathname === '/contact' ? 'text-slate-900' : ''}`}>Контакты</Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          {!isAdmin ? (
            <>
              <Link href="/cart" className="relative p-3 text-slate-900 hover:bg-slate-50 rounded-2xl transition-all">
                <ShoppingCart className="w-5 h-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link href="/admin" className="p-3 text-slate-900 hover:bg-slate-50 rounded-2xl transition-all">
                <User className="w-5 h-5" />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
               {pathname !== "/admin/login" && (
                 <>
                   <Link href="/" className="hidden sm:block text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">
                     Магазин
                   </Link>
                   <LogoutButton />
                 </>
               )}
            </div>
          )}

          <button
            className="lg:hidden p-3 text-slate-900 bg-slate-50 rounded-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {!isAdmin && isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t absolute top-full left-0 w-full animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          <nav className="flex flex-col p-8 gap-6 text-sm font-black uppercase tracking-[0.2em]">
            <Link href="/" className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl">Каталог <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /></Link>
            <Link href="/about" className="p-4 hover:bg-slate-50 rounded-2xl">О нас</Link>
            <Link href="/delivery" className="p-4 hover:bg-slate-50 rounded-2xl">Доставка</Link>
            <Link href="/contact" className="p-4 hover:bg-slate-50 rounded-2xl">Контакты</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
