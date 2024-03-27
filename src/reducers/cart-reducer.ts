import { Guitar } from "../types"

// acciones quee describen que esta pasando en la app
export type CartActions = 
  { type: "add-to-cart", payload: { item: Guitar } } |
  { type: "remove-from-cart", payload: { item: Guitar["id"] } } |
  { type: "increment-quantity", payload: { item: Guitar["id"] } } |
  { type: "decrement-quantity", payload: { item: Guitar["id"] } } |
  { type: "clean-cart" } 

export type ActivityState = {

}

// state inicial
const localStorageActivities = () => {
}

export const initialState = {
}

// nuestro reducer
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
  ) => {
    if (action.type === "save-activity") {

      let updatedActivities : Activity[] = []
      // este código maneja la lógica para actualizar el state
      if (state.activeId) { // editando registro
        updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)

      } else { // nuevo registro
        updatedActivities = [...state.activities, action.payload.newActivity]
      }

      // retorno del estado actualizado
      return {
        ...state,
        activities: updatedActivities,
        activeId: ""
      }
    }

    if (action.type === "set-activeId") {
      return {
        ...state,
        activeId: action.payload.id
      }
    }

    if (action.type === "remove-activity") {

      // retorno del estado actualizado
      return {
        ...state,
        activities: state.activities.filter(stateActivity => stateActivity.id !== action.payload.id)
      }
    }

    if (action.type === "restart-app") {
      const response = confirm("¿Desea resetear la app?")
      if (response) {
        return {
          activities: [],
          activeId: ""
        }
      }
    }

    return state
}