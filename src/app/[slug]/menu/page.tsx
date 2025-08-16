import { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/Categories";
import RestaurantHeader from "./components/Header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string; cpf: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return Object.values(ConsumptionMethod).includes(
    consumptionMethod as ConsumptionMethod,
  );
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod, cpf } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      menuCategories: { include: { products: true } },
    },
  });

  console.log(restaurant?.menuCategories);
  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <RestaurantHeader
        restaurant={restaurant}
        consumptionMethod={consumptionMethod as ConsumptionMethod}
        cpf={cpf}
      />
      <RestaurantCategories restaurant={restaurant} />
    </>
  );
};

export default RestaurantMenuPage;
