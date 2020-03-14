import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { loginForm } from '../../redux/authReducer'
import { connect } from 'react-redux'
import { required } from '../../utils/validator/validators'
import { Input } from '../common/FormsControls/FormsControls'
import { Redirect } from 'react-router-dom'
import styles from './Login.module.css'

const LoginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
               placeholder={"Email"} name={"email"}
               component={Input}/>
      </div>
      <div>
        <Field
               placeholder={"Password"}
               name={"password"}
               component={Input} type="password"/>
      </div>
      <div>
        <Field component={"input"} name={"rememberMy"} type={"checkbox"} />remember me
      </div>
      {props.error && (
        <div className={styles.formSummaryError}>
          {props.error}
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
    props.loginForm(formData.email, formData.password, formData.rememberMy)
  }

  if(props.isAuth) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps,{loginForm})(Login)
