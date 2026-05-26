"use client";

import { useState } from "react";
import { loginAction } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center container">
      <div className="w-full max-w-md bg-white border-2 border-slate-50 rounded-[3rem] p-12 shadow-2xl shadow-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tight uppercase mb-2">ВХОД</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Панель управления</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Введите пароль</label>
            <input
              name="password"
              type="password"
              className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:outline-none focus:border-blue-600 transition-all font-bold text-center text-xl tracking-[0.3em]"
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 disabled:bg-slate-100 disabled:text-slate-300"
          >
            {isLoading ? "ВХОД..." : "ВОЙТИ В ПАНЕЛЬ"}
          </button>
        </form>
      </div>
    </div>
  );
}
