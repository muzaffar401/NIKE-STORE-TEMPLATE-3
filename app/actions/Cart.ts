import { CartItem, CartAction } from '@/types/cart'

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const addToCart = (dispatch: React.Dispatch<CartAction>, item: CartItem) => {
  dispatch({ type: 'ADD_TO_CART', payload: item })

  const updatedCart = JSON.parse(localStorage.getItem('cart')) || []
  updatedCart.push(item)
  saveCartToLocalStorage(updatedCart)
}

export const removeFromCart = (dispatch: React.Dispatch<CartAction>, item: Omit<CartItem, 'quantity'>) => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: item })

  const updatedCart = JSON.parse(localStorage.getItem('cart')) || []
  const newCart = updatedCart.filter(cartItem => cartItem.id !== item.id || cartItem.color !== item.color || cartItem.size !== item.size)
  saveCartToLocalStorage(newCart)
}

export const updateQuantity = (dispatch: React.Dispatch<CartAction>, item: CartItem) => {
  dispatch({ type: 'UPDATE_QUANTITY', payload: item })

  const updatedCart = JSON.parse(localStorage.getItem('cart')) || []
  const index = updatedCart.findIndex(cartItem => cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size)
  if (index !== -1) {
    updatedCart[index].quantity = item.quantity
    saveCartToLocalStorage(updatedCart)
  }
}

export const clearCart = (dispatch: React.Dispatch<CartAction>) => {
  dispatch({ type: 'CLEAR_CART' })
  localStorage.removeItem('cart')
}
