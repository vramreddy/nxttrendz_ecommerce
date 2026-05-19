import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'

import {createSessionForUser, registerUser} from '../../utils/authStorage'

import './index.css'

class SignupForm extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = event => {
    event.preventDefault()
    const {username, password, confirmPassword} = this.state
    const trimmedUsername = username.trim()

    if (trimmedUsername === '' || password === '' || confirmPassword === '') {
      this.onSubmitFailure('Please fill all fields')
      return
    }

    if (password !== confirmPassword) {
      this.onSubmitFailure('Passwords do not match')
      return
    }

    const result = registerUser({username: trimmedUsername, password})
    if (result.success) {
      createSessionForUser(trimmedUsername)
      Cookies.set('jwt_token', `${trimmedUsername}_session`, {
        expires: 30,
        path: '/',
      })
      const {history} = this.props
      history.replace('/login', {
        username: trimmedUsername,
        password,
      })
    } else {
      this.onSubmitFailure(result.message)
    }
  }

  renderInputField = (label, id, type, value, onChange, placeholder) => (
    <div className="input-container">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="username-input-field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )

  render() {
    const {showError, errorMsg, username, password, confirmPassword} =
      this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="signup-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="signup-website-logo-mobile-image"
          alt="website logo"
        />
        <div className="signup-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="signup-website-logo-desktop-image"
            alt="website logo"
          />
          <h1 className="signup-heading">Create your account</h1>
          <p className="signup-description">
            Register once and use the same credentials to log in.
          </p>
          <form className="form-container" onSubmit={this.submitForm}>
            {this.renderInputField(
              'USERNAME',
              'signup-username',
              'text',
              username,
              this.onChangeUsername,
              'Username',
            )}
            {this.renderInputField(
              'PASSWORD',
              'signup-password',
              'password',
              password,
              this.onChangePassword,
              'Password',
            )}
            {this.renderInputField(
              'CONFIRM PASSWORD',
              'confirm-password',
              'password',
              confirmPassword,
              this.onChangeConfirmPassword,
              'Confirm Password',
            )}
            <button type="submit" className="login-button">
              Sign Up
            </button>
            {showError && <p className="error-message">*{errorMsg}</p>}
            <p className="auth-switch-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-switch-link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default SignupForm