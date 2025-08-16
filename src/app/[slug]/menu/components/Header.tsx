"use client";

import { ConsumptionMethod, Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { removeCpfPunctuation } from "../helpers/cpf";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name" | "slug">;
  consumptionMethod: ConsumptionMethod;
  cpf: string;
}

const RestaurantHeader = ({
  restaurant,
  consumptionMethod,
  cpf,
}: RestaurantHeaderProps) => {
  const router = useRouter();

  // Se eu tiver um cpf, eu vou para a página de pedidos com o cpf
  // Se eu não tiver um cpf, eu vou para a página de pedidos sem o cpf
  const handleOrdersClick = () => {
    const cleanCpf = cpf ? removeCpfPunctuation(cpf) : "";

    if (cleanCpf) {
      // Com CPF: vai direto para a página de pedidos
      router.push(
        `/${restaurant.slug}/orders?consumptionMethod=${consumptionMethod}&cpf=${cleanCpf}`,
      );
    } else {
      // Sem CPF: vai para a página de pedidos (que vai pedir o CPF)
      router.push(
        `/${restaurant.slug}/orders?consumptionMethod=${consumptionMethod}`,
      );
    }
  };

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={restaurant.coverImageUrl ?? ""}
        alt={restaurant.name ?? ""}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default RestaurantHeader;
