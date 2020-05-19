import {ResultCodeEnum, userAPI} from '../api/api'
import {updateObjectInArray} from '../utils/objectHelpers'
import {UserType} from "../types/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";


const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  followingInProgress: [] as Array<number>
}

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
      }
    case 'SET_USERS':
      return { ...state, users: action.users}
    case 'SET_TOTAL_USERS_COUNT':
      return {...state, totalUsersCount: action.totalUsersCount}
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage
      }
    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: !state.isFetching
      }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
  unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
  setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
  setUsersTotalCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
  toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId
  } as const)

}

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    // let ssss = getState().auth.id

    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    const data = await userAPI.getUsers(page, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setUsersTotalCount(data.totalCount))
  }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
  dispatch(actions.toggleIsFollowingProgress(true, userId))
  const response = await apiMethod(userId)
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch: any) => {
    let apiMethod = userAPI.followUser.bind(userId)
    _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess)
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch: any) => {
    let apiMethod = userAPI.unfollowUser.bind(userId)
    _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess)
  }
}



export default usersReducer
