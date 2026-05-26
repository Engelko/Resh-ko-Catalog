"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "lax",
    });
    redirect("/admin");
  }

  return { error: "Неверный пароль доступа" };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
  redirect("/admin/login");
}
