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

// reducer
export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
  ) => {
    if (action.type === "add-to-cart") {
      return {
        ...state
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