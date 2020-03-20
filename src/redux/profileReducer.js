import { profileAPI, userAPI } from '../api/api'


const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'SET-DELETE_POST'

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
    default:
      return state
  }
}

export const addPostActionCreator = (text) => {

  return {
    type: ADD_POST,
    newText: text
  }
}

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await userAPI.getProfile(userId)
      dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
      dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)
      if(response.data.resultCode === 0) {
        dispatch(setStatus(status))
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
