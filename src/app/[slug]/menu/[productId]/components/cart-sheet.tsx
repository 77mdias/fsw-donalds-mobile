import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{formatCurrency(product.price)}</p>
              <p>{product.quantity}</p>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <p>Total</p>
            <p>{formatCurrency(products.reduce((acc, product) => acc + product.price * product.quantity, 0))}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet;