"use client"
import { Product } from "@prisma/client";
import { createContext, useState } from "react";

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  }

  const addProduct = (product: CartProduct) => {
    const productIndex = products.some(p => p.id === product.id);
    if (!productIndex) {
      return setProducts((prevProducts) => [...prevProducts, product]);
    }
  setProducts(prevProducts => {
    return prevProducts.map(prevProduct => {
      if (prevProduct.id === product.id) {
        return { ...prevProduct, quantity: prevProduct.quantity + product.quantity };
      }
      return prevProduct;
    });
  });
  }
  return (
    <CartContext.Provider value={{
      isOpen,
      products,
      toggleCart,
      addProduct,
    }}>
      {children}
    </CartContext.Provider>
  )
}