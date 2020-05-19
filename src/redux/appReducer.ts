import { getAuthUserData } from './authReducer'
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
};

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state
  }
};

type ActionsTypes = initializedSuccessActionType

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess())
  })
};

export default appReducer
