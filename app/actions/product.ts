"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// Transliteration helper
function transliterate(text: string) {
  const ru: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };
  return text.split('').map(function (char) {
    return ru[char.toLowerCase()] || char;
  }).join('').replace(/[^a-z0-9]/gi, '-').toLowerCase().replace(/-+/g, '-').replace(/^-|-$/g, '');
}

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  let slug = formData.get("slug") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const imageFile = formData.get("image") as File;

  if (!slug || slug.trim() === "") {
    slug = transliterate(title);
  }

  let imageUrl = "/uploads/placeholder.jpg";
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${imageFile.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  await prisma.product.create({
    data: {
      title,
      slug,
      price,
      stock,
      description,
      imageUrl,
      categoryId,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const imageFile = formData.get("image") as File;

  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) return { error: "Product not found" };

  let imageUrl = existingProduct.imageUrl;
  if (imageFile && imageFile.size > 0) {
    // Delete old image if it's not a placeholder
    if (existingProduct.imageUrl !== "/uploads/placeholder.jpg") {
      try {
        const oldPath = path.join(process.cwd(), "public", existingProduct.imageUrl);
        if (existsSync(oldPath)) await unlink(oldPath);
      } catch (err) {
        console.error("Error deleting old image:", err);
      }
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${imageFile.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  await prisma.product.update({
    where: { id },
    data: {
      title,
      slug,
      price,
      stock,
      description,
      imageUrl,
      categoryId,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { error: "Product not found" };

  // Delete image file
  if (product.imageUrl !== "/uploads/placeholder.jpg") {
    try {
      const filePath = path.join(process.cwd(), "public", product.imageUrl);
      if (existsSync(filePath)) await unlink(filePath);
    } catch (err) {
      console.error("Error deleting image during product deletion:", err);
    }
  }

  await prisma.product.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true };
}
