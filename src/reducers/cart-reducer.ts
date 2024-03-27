import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

// acciones quee describen que esta pasando en la app
export type CartActions = 
  { type: "add-to-cart", payload: { item: Guitar } } |
  { type: "remove-from-cart", payload: { id: Guitar["id"] } } |
  { type: "increase-quantity", payload: { id: Guitar["id"] } } |
  { type: "decrease-quantity", payload: { id: Guitar["id"] } } |
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
      
      // cart -> state.cart, item.id -> action.payload.item.id, findIndex -> find
      const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
      let updatedCart : CartItem[] = []

      if (itemExists) { // el elemento existe
        updatedCart = state.cart.map(item => {
          if (item.id === action.payload.item.id) { // elemento repetido
            if (item.quantity < maxItems) {
              return {
                ...item, quantity: item.quantity + 1
              }
            } 
            else {
              return item // si llego a 5, entra aca
            }
          }
          else {
            return item // elemento que no estoy buscando pero que no quiero perder
          }
        })
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
      const updatedCart = state.cart.filter(guitar => guitar.id !== action.payload.id)

      return {
        ...state,
        cart: updatedCart
      }
    }

    if (action.type === "increase-quantity") {
      const updatedCart = state.cart.map(guitar => {
        if (guitar.id === action.payload.id && guitar.quantity < maxItems) {
          return {
            ...guitar,
            quantity: guitar.quantity + 1 // toma una copia y aumenta la cantidad
          }
        }
        return guitar
      })
      
      return {
        ...state,
        cart: updatedCart
      }
    }

    if (action.type === "decrease-quantity") {

      const updatedCart = state.cart.map(guitar => {
        if (guitar.id === action.payload.id && guitar.quantity > minItems) {
          return {
            ...guitar,
            quantity: guitar.quantity - 1 // toma una copia y decrementa la cantidad
          }
        }
        return guitar
      })

      return {
        ...state,
        cart: updatedCart
      }
    }

    if (action.type === "clean-cart") {
      return {
        ...state,
        cart: []
      }
    }

    return state
}