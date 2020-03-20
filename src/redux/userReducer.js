import { userAPI } from '../api/api'
import { updateObjectInArray } from '../utils/objectHelpers'

const  FOLLOW = 'FOLLOW'
const  UNFOLLOW = 'UNFOLLOW'
const  SET_USERS = 'SET-USERS'
const  SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const  SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const  TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const  TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

const initialState = {
  users: [ ],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
      }
    case SET_USERS:
      return { ...state, users: action.users}
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count}
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: !state.isFetching
      }
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    default :
      return state
  }
}

export const followSuccess = (userId) => ({type: FOLLOW , userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId })
export const setUsers = (users) => ({type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (page, pageSize) => {

  return async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    const data = await userAPI.getUsers(page, pageSize)
      dispatch(toggleIsFetching(false))
      dispatch(setUsers(data.items))
      dispatch(setUsersTotalCount(data.totalCount))
  }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowingProgress(true, userId))
  const response = await apiMethod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleIsFollowingProgress(false, userId))
}

export const follow = (userId) => {
  return async (dispatch) => {
    let apiMethod = userAPI.followUser.bind(userId)

    followUnfollowFlow(dispatch, userId, apiMethod, followSuccess)


  }
}

export const unfollow = (userId) => {
  return async (dispatch) => {
    let apiMethod = userAPI.unfollowUser.bind(userId)

    followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess)
  }
}



export default usersReducer
