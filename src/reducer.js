
const reducer = (state, action) => {

  if (action.type == 'LOADING') {
    return {...state, loading: true}
  }

  if (action.type == 'DISPLAY_ITEMS') {
    return {...state, loading: false, cart: action.payload}
  }

  if (action.type == 'CLEAR_CART') {
    return {...state, cart: []}
  }


  if (action.type == 'REMOVE') {
    return {...state, cart: state.cart.filter(item => action.payload !== item.id)}
  }


  if (action.type == 'TOGGLE_AMOUNT') {
    let tempCart = state.cart.map(item => {
      if (action.payload === item.id) {
        if (action.met === 'INC') {
          return {...item, amount: item.amount + 1}
        }
        else if (action.met === 'DEC') {
          return {...item, amount: item.amount - 1}
        }
      }
      return item
    }).filter(item => item.amount !== 0)
    return {...state, cart: tempCart}
  }


  if (action.type == 'GET_TOTALS') {
    const amount = state.cart.reduce((total, cartItems) => {
      total += cartItems.amount
      return total
    },0)

    const total = state.cart.reduce((total, cartItems) => {
      total += cartItems.amount * cartItems.price
      return total
    }, 0)

    
    return {...state, amount, total}
  }

  return state
}

export default reducer;