import { profileAPI, userAPI } from '../api/api'
import { stopSubmit } from 'redux-form'


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
  ],
  profile: null,
  newPostText: "it-kamasutra.com",
  status: " "
}

const profileReducer = (state = initialState , action) => {
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
        profile: {...state.profile, photos: action.photos}

      }
    default:
      return state
  }
}

export const addPostActionCreator = (text) => {return {type: ADD_POST, newText: text}}
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await userAPI.getProfile(userId)
      dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
      dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  try {
    const response = await profileAPI.updateStatus(status)
    if(response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  } catch (error) {
    debugger

  }

}

export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
      if(response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))

      }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.id

  const response = await profileAPI.saveProfile(profile)
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
    return Promise.reject(response.data.messages[0])
  }
}


// export const setUserProfile = (userId) => {
//   return (dispatch) => {
//
//     if(!userId) {
//       userId = 2
//     }
//     userAPI.profileUser(userId)
//       .then((response) => {
//         dispatch(setUserProfileData(response.data))
//       })
//   }
// }


export default profileReducer
