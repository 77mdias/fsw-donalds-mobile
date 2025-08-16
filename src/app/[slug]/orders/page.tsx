import { ConsumptionMethod } from "@prisma/client";

import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./componets/cpf-form";
import OrderList from "./componets/order-list";

// Interface para as props da página de pedidos
interface OrdersPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    cpf?: string;
    consumptionMethod?: ConsumptionMethod;
  }>;
}

// Função assíncrona para renderizar a página de pedidos
const OrdersPage = async ({ params, searchParams }: OrdersPageProps) => {
  const { slug } = await params;
  const { cpf, consumptionMethod } = await searchParams;

  // ADICIONAR VALIDAÇÃO DE CPF
  if (!cpf) {
    return <CpfForm />;
  }
  // ADICIONAR VALIDAÇÃO DE CPF
  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }

  // Definir valor padrão para consumptionMethod se não estiver presente
  const finalConsumptionMethod =
    consumptionMethod || ConsumptionMethod.TAKE_AWAY;

  // ADICIONAR PAGINAÇÃO
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    // ADICIONAR FILTRO POR CPF
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    // ADICIONAR INCLUSÃO DE RESTAURANTE E PRODUTOS
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
      OrderProcuct: {
        include: {
          product: true,
        },
      },
    },
  });

  // ADICIONAR LISTA DE PEDIDOS
  return (
    <OrderList
      orders={orders}
      consumptionMethod={finalConsumptionMethod}
      cpf={cpf}
      restaurantSlug={slug}
    />
  );
};

export default OrdersPage;
