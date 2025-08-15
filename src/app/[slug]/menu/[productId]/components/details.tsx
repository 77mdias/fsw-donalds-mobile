"use client"
import { type Prisma } from "@prisma/client";
import { CheckIcon, ChefHatIcon, ChevronLeftIcon } from "lucide-react";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface DetailsProps {
  product: Prisma.ProductGetPayload<{include: {restaurant: true}}>
}

const Details = ({ product }: DetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  //Não pode ser menor que 1
  if (quantity <= 0) {
    setQuantity(1);
  }

  return (
    <div className="flex flex-col relative z-50 rounded-t-3xl py-5 mt-[-1.5rem] p-5 flex-auto">
      <div className="flex-auto">
        {/*RESTAURANTE*/}
        <div className="flex items-center gap-1.5">
          <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full" />
          <p className="text-xs font-medium text-muted-foreground">{product.restaurant.name}</p>
       </div>
      {/*NOME DO PRODUTO*/}
      <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
      
      {/*PREÇO E QUANTIDADE*/}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{formatCurrency(product.price)}</h3>
        <div className="flex items-center gap-3 text-center">
          <Button variant='outline' className="w-8 h-8 rounded-xl" onClick={() => setQuantity(quantity - 1)}>
            <ChevronLeftIcon />
          </Button>
          <p className="w-4">{quantity}</p>
          <Button variant='destructive' className="w-8 h-8 rounded-xl" onClick={() => setQuantity(quantity + 1)}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/*DESCRIÇÃO*/}
      <div className="mt-6 space-y-3">
        <h4 className="font-semibold">Sobre</h4>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      {/*ADICIONAIS*/}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-1">
          <ChefHatIcon size={18} />
          <h4 className="font-semibold">Ingredientes</h4>
        </div>
        {product.ingredients.map((ingredient) => (
          <div key={ingredient} className="flex items-center gap-1">
            <CheckIcon size={18} />
            <p className="text-sm text-muted-foreground">{ingredient}</p>
          </div>
        ))}
      </div>
      </div>

      {/*BOTAO DE ADICIONAR AO CARRINHO*/}
        <Button className="w-full rounded-full mt-6">Adicionar à sacola</Button>
    </div>
  )
}

export default Details;