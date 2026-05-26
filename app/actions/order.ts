"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export async function submitOrder(formData: FormData, cartItems: CartItem[]) {
  const customerName = formData.get("customerName") as string;
  const customerPhone = formData.get("customerPhone") as string;
  const deliveryAddress = formData.get("deliveryAddress") as string;

  if (!customerName || !customerPhone || cartItems.length === 0) {
    return { error: "Необходимо заполнить имя и телефон, и корзина не должна быть пуста." };
  }

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  try {
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the order
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerPhone,
          deliveryAddress,
          totalAmount,
          items: {
            create: cartItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // 2. Decrease stock for each item
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    revalidatePath("/");
    revalidatePath("/admin/orders");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order submission error:", error);
    return { error: "Произошла ошибка при оформлении заказа." };
  }
}
