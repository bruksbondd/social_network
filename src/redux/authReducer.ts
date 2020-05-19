import {authApi, ResultCodeEnum, ResultCodeForCaptcha, securityAPI} from '../api/api'
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

const initialState = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, ...action.payload}
        default :
            return state
    }
};

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType | FormAction

type SetAuthUserDataActionPayloadType = {
    id: (number | null)
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: (number | null), email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string | null }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authApi.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;

        dispatch(setAuthUserData(id, email, login, true))
    }
};

export const loginForm = (email: string, password: string, rememberMy: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authApi.login(email, password, rememberMy, captcha);

    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }

        let messages = loginData.messages.length > 0
            ? loginData.messages[0]
            : "Some error";
        dispatch(stopSubmit("login", {_error: messages}))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
};

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authApi.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export default authReducer
