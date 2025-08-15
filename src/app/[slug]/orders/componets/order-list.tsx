import { OrderStatus, type Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderListProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        }
      }
      OrderProcuct: {
        include: {
          product: true
        }
      }
    };
  }>[];
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === OrderStatus.COMPLETED) return "Finalizado";
  if (status === OrderStatus.IN_PREPARATION) return "Em Preparo";
  if (status === OrderStatus.PENDING) return "Pendente";
  return "";
}

const OrderList = ({ orders }: OrderListProps) => {
  return <div className="space-y-6 p-5">
    <Button size="icon" variant="secondary" className="rounded-full">
      <ChevronLeftIcon className="w-4 h-4" />
    </Button>
    <div className="flex items-center gap-3">
      <ScrollTextIcon className="w-4 h-4" />
      <h2 className="text-lg font-semibold">Meus Pedidos</h2>
    </div>
    {orders.map((order) => (
      <Card key={order.id} className="p-4">
        <CardContent className="p-5 space-y-4">
          <div className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white ${order.status === OrderStatus.COMPLETED ? "bg-green-400 text-white" : "bg-gray-200 text-gray-500"}`}>
            {getStatusLabel(order.status)}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative h-5 w-5">
              <Image src={order.restaurant.avatarImageUrl} alt={order.restaurant.name} fill className="rounded-sm" />
            </div>
            <p className="font-semibold text-sm">{order.restaurant.name}</p>
          </div>
          <Separator />
          <div className="space-y-2">
            {order.OrderProcuct.map((orderProduct) => (
              <div key={orderProduct.id} className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-semibold h-5 w-5">
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
  </div>;
};

export default OrderList;