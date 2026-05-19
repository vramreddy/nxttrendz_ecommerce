import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {deleteCartItem, updateCartItemQuantity} = value
      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
      const onDeleteCartItem = () => {
        deleteCartItem(id)
      }
      const onDecreaseQuantity = () => {
        updateCartItemQuantity(id, -1)
      }
      const onIncreaseQuantity = () => {
        updateCartItemQuantity(id, 1)
      }
      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={title} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecreaseQuantity}
              >
                <span aria-hidden="true">-</span>
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncreaseQuantity}
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
            <div className="total-price-delete-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onDeleteCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onDeleteCartItem}
          >
            <span aria-hidden="true">×</span>
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
