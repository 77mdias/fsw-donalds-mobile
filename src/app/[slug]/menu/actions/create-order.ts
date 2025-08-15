"use server";

import { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrderProps {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: string;
  slug: string;
  total: number;
}

export const createOrder = async (input: CreateOrderProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productsWithPrice = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const total = productsWithPrice.reduce((acc, product) => {
    const productPrice =
      product.price * input.products.find((p) => p.id === product.id)!.quantity;
    return acc + productPrice;
  }, 0);

  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod as ConsumptionMethod,
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      total,
      OrderProcuct: {
        createMany: {
          data: input.products.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
            price: productsWithPrice.find((p) => p.id === product.id)!.price,
          })),
        },
      },
      restaurantId: restaurant.id,
    },
  });
  redirect(`/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`);
};
