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
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  total: number;
  totalQuantity: number;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  total: 0,
  totalQuantity: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);

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

  const decreaseProductQuantity = (productId: string) => {
    setProducts(prevProducts => {
      return prevProducts.map(prevProduct => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        } if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts(prevProducts => {
      return prevProducts.map(prevProduct => {
        if (prevProduct.id === productId) {
          return { ...prevProduct, quantity: prevProduct.quantity + 1 };
        }
        return prevProduct;
      });
    });
  }

  const removeProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  }

  return (
    <CartContext.Provider value={{
      isOpen,
      products,
      toggleCart,
      addProduct,
      decreaseProductQuantity,
      increaseProductQuantity,
      removeProduct,
      total: products.reduce((acc, product) => acc + product.price * product.quantity, 0),
      totalQuantity,
      }}>
      {children}
    </CartContext.Provider>
  )
}