import { useEffect, useState } from "react";
import { db } from "../data/db";
import type { CartItem } from '../types/index'

export const useCart = () => {
  
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  } 

  // state
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart]);

  const maxItems = 5
  const minItems = 1

  function addToCart(item) {

    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExists >= 0) { // el elemento existe
      if (cart[itemExists].quantity >= maxItems) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }
    else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    const updatedCart = cart.filter(guitar => guitar.id !== id)
    setCart(updatedCart)
  }

  function incrementQuantity(id) {
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

  function decrementQuantity(id) {
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
    data,
    cart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    cleanCart
  }
}