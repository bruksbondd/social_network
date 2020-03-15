import { authApi } from '../api/api'
import {stopSubmit} from 'redux-form'

const  SET_USER_DATA = 'SET_USER_DATA'


const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }
    default :
      return state
  }
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA , payload: {id, email, login, isAuth}})



export const getAuthUserData = () => (dispatch) => {
    return authApi.me()
      .then((response) => {
        if (response.data.resultCode === 0) {
          let { id, email, login } = response.data.data

          dispatch(setAuthUserData(id, email, login, true))
        }
      })
}

export const loginForm = (email, password, rememberMy) => (dispatch) => {

  authApi.login(email, password, rememberMy)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(getAuthUserData())
        }
        else {
          let messages = response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error"
          dispatch(stopSubmit(
            "login",
            {_error: messages}
          ))
        }
      })
}

export const logout = () => (dispatch) => {
  authApi.logout()
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
      }
    })
}

export default authReducer
