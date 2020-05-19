import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import { loginForm } from '../../redux/authReducer'
import { connect } from 'react-redux'
import { optional, required } from '../../utils/validator/validators'
import {Input, createField} from '../common/FormsControls/FormsControls'
import { Redirect } from 'react-router-dom'
import styles from './Login.module.css'
import {AppStateType} from "../../redux/reduxStore"

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {

  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
      {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
      {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMy', [optional], Input, {type: 'checkbox'}, 'remember me')}

      {captchaUrl && <img src={captchaUrl} alt="Captcha" />}
      {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [], Input, {})}

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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm)

type MapStatePropsTypes = {
  captchaUrl: string | null
  isAuth: boolean
}

type MapDispatchPropsTypes = {
  loginForm: (email: string, password: string, rememberMy: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
  captcha: string;
  rememberMy: boolean;
  password: string
  email: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStatePropsTypes & MapDispatchPropsTypes> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsTypes => {
  return {
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps,{loginForm})(Login)
