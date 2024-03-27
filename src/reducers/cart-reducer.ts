import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

// acciones quee describen que esta pasando en la app
export type CartActions = 
  { type: "add-to-cart", payload: { item: Guitar } } |
  { type: "remove-from-cart", payload: { item: Guitar["id"] } } |
  { type: "increase-quantity", payload: { item: Guitar["id"] } } |
  { type: "decrease-quantity", payload: { item: Guitar["id"] } } |
  { type: "clean-cart" } 

export type CartState = {
  data: Guitar[]
  cart: CartItem[]
}

// state inicial
export const initialState : CartState = {
  data: db,
  cart: []
}

const maxItems = 5
const minItems = 1

// reducer
export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
  ) => {
    if (action.type === "add-to-cart") {
      
      // cart -> state.cart, item.id -> action.payload.item.id
      const itemExists = state.cart.findIndex(guitar => guitar.id === action.payload.item.id)
      let updatedCart : CartItem[] = []

      if (itemExists >= 0) { // el elemento existe
        if (state.cart[itemExists].quantity >= maxItems) return
        updatedCart = [...state.cart]
        updatedCart[itemExists].quantity++
      }
      else {
        const newItem : CartItem = {...action.payload.item, quantity: 1}
        updatedCart = [...state.cart, newItem]
      }
      return {
        ...state,
        cart: updatedCart
      }
    }

    if (action.type === "remove-from-cart") {
      return {
        ...state
      }
    }

    if (action.type === "increase-quantity") {
      return {
        ...state
      }
    }

    if (action.type === "decrease-quantity") {
      return {
        ...state
      }
    }

    if (action.type === "clean-cart") {
      return {
        ...state
      }
    }

    return state
}