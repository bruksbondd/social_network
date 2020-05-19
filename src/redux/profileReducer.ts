import { profileAPI, userAPI } from '../api/api'
import {FormAction, stopSubmit} from 'redux-form'
import {PhotosType, PostType, ProfileType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";


const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'SET-DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 10 },
    { id: 2, message: 'Its my first post', likesCount: 15 },
    { id: 3, message: 'Dada', likesCount: 15 },
    { id: 4, message: 'Ok', likesCount: 8 }
  ] as Array<PostType>,
    profile: null as ProfileType | null,
    newPostText: "it-kamasutra.com" as string | null,
    status: " " as string
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newText,
        likesCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ''

      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile

      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status

      }
    case DELETE_POST:
      return {
        ...state, posts: state.posts.filter(p => p.id !== action.postId)
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
          profile: {...state.profile, photos: action.photos} as ProfileType

      }
    default:
      return state
  }
}

type ActionsTypes = AddPostActionCreatorActionType | SetUserProfileActionType | SetStatusActionType
    | DeletePostActionType | SavePhotoSuccessActionType

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newText: string
}
export const addPostActionCreator = (newText: string): AddPostActionCreatorActionType => {
    return {type: ADD_POST, newText: newText}
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: (number | null)): ThunkType => async (dispatch) => {
  const response = await userAPI.getProfile(userId)
      dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
      dispatch(setStatus(response.data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    const response = await profileAPI.updateStatus(status)
    if(response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  } catch (error) {
      console.log(error)
  }

}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
      if(response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))

      }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.id

  const response = await profileAPI.saveProfile(profile)
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
      // dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
    return Promise.reject(response.data.messages[0])
  }
}

export default profileReducer
