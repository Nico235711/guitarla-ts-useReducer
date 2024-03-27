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

  function removeFromCart(id: Guitar["id"]) {
    const updatedCart = cart.filter(guitar => guitar.id !== id)
    setCart(updatedCart)
  }

  function incrementQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity < maxItems) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1 // toma una copia y aumenta la cantidad
        }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  function decrementQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity > minItems) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1 // toma una copia y decrementa la cantidad
        }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  function cleanCart() {
    setCart([])
  }

  return {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    cleanCart
  }
}