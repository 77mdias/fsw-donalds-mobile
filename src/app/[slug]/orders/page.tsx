
import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./componets/cpf-form";
import OrderList from "./componets/order-list";

interface OrdersPageProps {
  searchParams: Promise<{cpf: string}>
}

const OrdersPage = async ({searchParams}: OrdersPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf) {
    return <CpfForm />
  }
  if (!isValidCpf(cpf)) {
    return <CpfForm />
  }
  const orders = await db.order.findMany({
    where: {
      customerCpf: removeCpfPunctuation(cpf)
    },
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
  return <OrderList orders={orders} />;
};

export default OrdersPage;