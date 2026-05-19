import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  updateCartItemQuantity: () => {},
})

export default CartContext
