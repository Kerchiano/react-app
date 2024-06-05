export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

import { useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState<IProduct[]>([]);

  const addToCart = (product: IProduct) => {
    setCart([...cart, product]);
  };

  const removeFromItem = (idToRemove: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((product) => product.id !== idToRemove);
      return newCart;
    });
  };

  const isProductAdded = (productId: number) => {
    return cart.some((product) => product.id === productId);
  };

  return { cart, removeFromItem, addToCart, isProductAdded };
};

export default useCart;
