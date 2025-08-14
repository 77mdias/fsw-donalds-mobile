import { ConsumptionMethod } from "@prisma/client";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantHeader from "./components/Header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
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
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <RestaurantHeader restaurant={restaurant} />
    </>
  );
};

export default RestaurantMenuPage;
