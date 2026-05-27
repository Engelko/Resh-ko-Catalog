"use client";

import { logoutAction } from "@/app/actions/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logoutAction()}
      className="inline-flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
    >
      <LogOut className="w-4 h-4" />
      ВЫЙТИ
    </button>
  );
}
