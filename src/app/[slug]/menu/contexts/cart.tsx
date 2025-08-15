"use client"
import { Product } from "@prisma/client";
import { createContext, useState } from "react";

interface CartProduct extends Product {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  }

  return (
    <CartContext.Provider value={{
      isOpen,
      products,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}