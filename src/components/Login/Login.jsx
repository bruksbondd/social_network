import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { loginForm } from '../../redux/authReducer'
import { connect } from 'react-redux'
import { optional, required } from '../../utils/validator/validators'
import { Input, createField } from '../common/FormsControls/FormsControls'
import { Redirect } from 'react-router-dom'
import styles from './Login.module.css'

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {

  return (
    <form onSubmit={handleSubmit}>
      {createField('Email', 'email', [required], Input)}
      {createField('Password', 'password', [required], Input, { type: 'password' })}
      {createField(null, 'rememberMy', [optional], Input, { type: 'checkbox' }, 'remember me')}

      {captchaUrl && <img src={captchaUrl} alt="Captcha" />}
      {captchaUrl && createField('Symbols from image', 'captcha', [], Input, {}) }

      {error && (
        <div className={styles.formSummaryError}>
          {error}
        </div>
      )}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.loginForm(formData.email, formData.password, formData.rememberMy, formData.captcha)
  }

  if(props.isAuth) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps,{loginForm})(Login)
