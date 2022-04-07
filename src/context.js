import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  amount: 0,
  total: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'});
  }

  const remove = (id) => {
    dispatch({type: 'REMOVE', payload: id})
  }

  const toggleAmount = (id, met) => {
    dispatch({type: 'TOGGLE_AMOUNT', payload: id, met: met})
  }

  const fetchData = async () => {
    dispatch({type: 'LOADING'});
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type: 'DISPLAY_ITEMS', payload: cart})
  }

  useEffect(() => fetchData(), [])

  useEffect(() => {
    dispatch({type: 'GET_TOTALS'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{...state,
            clearCart,
            remove,
            toggleAmount,
            fetchData,
          }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }