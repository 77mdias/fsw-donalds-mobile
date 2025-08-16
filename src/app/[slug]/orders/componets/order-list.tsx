"use client";
import { OrderStatus, type Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderListProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      OrderProcuct: {
        include: {
          product: true;
        };
      };
    };
  }>[];
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === OrderStatus.COMPLETED) return "Finalizado";
  if (status === OrderStatus.PENDING) return "Pendente";
  if (status === OrderStatus.PAYMENT_CONFIRMED) return "Pagamento Realizado";
  if (status === OrderStatus.PAYMENT_FAILED) return "Pagamento Falhou";
  return "";
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();

  // TODO: ESTILOS PARA OS STATUS DOS PEDIDOS | PARA NÃO EXTENDER A LINHA DE CÓDIGO
  const stylesPending = "bg-gray-400 text-white";
  const stylesPaymentConfirmed = "bg-green-300 text-gray-800";
  const stylesPaymentFailed = "bg-red-300 text-gray-800";
  const stylesStatus =
    "w-fit rounded-full px-2 py-1 text-xs font-semibold text-white";
  return (
    <div className="space-y-6 p-5">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon className="h-4 w-4" />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id} className="p-4">
          <CardContent className="space-y-4 p-5">
            <div
              className={[
                stylesStatus,
                order.status === OrderStatus.PENDING && stylesPending,
                order.status === OrderStatus.PAYMENT_CONFIRMED &&
                  stylesPaymentConfirmed,
                order.status === OrderStatus.PAYMENT_FAILED &&
                  stylesPaymentFailed,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {getStatusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  fill
                  className="rounded-sm"
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.OrderProcuct.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
