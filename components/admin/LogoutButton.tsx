"use client";

import { logoutAction } from "@/app/actions/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logoutAction()}
      className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-red-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-slate-200"
    >
      <LogOut className="w-3.5 h-3.5" />
      ВЫЙТИ
    </button>
  );
}
