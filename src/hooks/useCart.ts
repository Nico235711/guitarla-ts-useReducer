import { useEffect, useState } from "react";
import type { CartItem, Guitar } from '../types/index'

export const useCart = () => {
  
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  } 

  // state
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart]);

  return {
    cart,
  }
}