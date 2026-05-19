import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm/index'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

const cartStorageKey = 'cartList'

const normalizeCartList = cartList =>
  cartList.reduce((normalizedList, cartItem) => {
    const existingCartItem = normalizedList.find(
      eachItem => eachItem.id === cartItem.id,
    )

    if (existingCartItem) {
      return normalizedList.map(eachItem =>
        eachItem.id === cartItem.id
          ? {
              ...eachItem,
              quantity: eachItem.quantity + cartItem.quantity,
            }
          : eachItem,
      )
    }

    return [...normalizedList, cartItem]
  }, [])

const getStoredCartList = () => {
  try {
    const storedCartList = localStorage.getItem(cartStorageKey)
    return storedCartList ? normalizeCartList(JSON.parse(storedCartList)) : []
  } catch (error) {
    return []
  }
}

class App extends Component {
  state = {
    cartList: getStoredCartList(),
  }

  componentDidUpdate(prevProps, prevState) {
    const {cartList} = this.state
    if (prevState.cartList !== cartList) {
      localStorage.setItem(cartStorageKey, JSON.stringify(cartList))
    }
  }

  addCartItem = product => {
    this.setState(prevState => {
      const normalizedCartList = normalizeCartList(prevState.cartList)
      const existingCartItem = normalizedCartList.find(
        eachItem => eachItem.id === product.id,
      )

      if (existingCartItem) {
        return {
          cartList: normalizedCartList.map(eachItem =>
            eachItem.id === product.id
              ? {
                  ...eachItem,
                  quantity: eachItem.quantity + product.quantity,
                }
              : eachItem,
          ),
        }
      }

      return {cartList: [...normalizedCartList, product]}
    })
  }

  deleteCartItem = productId => {
    this.setState(prevState => ({
      cartList: normalizeCartList(prevState.cartList).filter(
        eachItem => eachItem.id !== productId,
      ),
    }))
  }

  updateCartItemQuantity = (productId, quantityChange) => {
    this.setState(prevState => ({
      cartList: normalizeCartList(prevState.cartList)
        .map(eachItem => {
          if (eachItem.id !== productId) {
            return eachItem
          }

          const updatedQuantity = eachItem.quantity + quantityChange
          return updatedQuantity > 0
            ? {...eachItem, quantity: updatedQuantity}
            : eachItem
        })
        .filter(eachItem => eachItem.quantity > 0),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            updateCartItemQuantity: this.updateCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
