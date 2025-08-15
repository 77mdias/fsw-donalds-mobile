import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../../contexts/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className='w-[80%]'>
        <SheetHeader>
          <SheetTitle className="text-left mb-5">Sacola</SheetTitle>
        </SheetHeader>
        <div className="py-5 flex flex-col h-full">
          <div className="flex-auto ">
            {products.map((product) => (
            <CartProductItem key={product.id} product={product} />
          ))}
          </div>
          <Card className="mb-6">
            <CardContent>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(products.reduce((acc, product) => acc + product.price * product.quantity, 0))}</p>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full rounded-full mb-5">Finalizar compra</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet;