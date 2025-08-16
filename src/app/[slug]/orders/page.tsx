
import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./componets/cpf-form";
import OrderList from "./componets/order-list";


// Interface para as props da página de pedidos
interface OrdersPageProps {
  searchParams: Promise<{cpf: string}>
}

// Função assíncrona para renderizar a página de pedidos
const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  // ADICIONAR VALIDAÇÃO DE CPF
  if (!cpf) {
    return <CpfForm />
  }
  // ADICIONAR VALIDAÇÃO DE CPF
  if (!isValidCpf(cpf)) {
    return <CpfForm />
  }

  // ADICIONAR PAGINAÇÃO
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc"
    },
    // ADICIONAR FILTRO POR CPF
    where: {
      customerCpf: removeCpfPunctuation(cpf)
    },
    // ADICIONAR INCLUSÃO DE RESTAURANTE E PRODUTOS
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        }
      },
      OrderProcuct: {
        include: {
          product: true
        }
      }
    }
  });

  // ADICIONAR LISTA DE PEDIDOS
  return <OrderList orders={orders} />;
};

export default OrdersPage;