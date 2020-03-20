import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  follow,
  unfollow,
  requestUsers
} from '../../redux/userReducer'
import Users from './Users'
import Preloader from './../common/preloader/Preloader'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import {
  getUsers,
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getIsFetching,
  getFollowingInProgress
} from '../../redux/usersSelectors'


class UsersContainer extends Component{
  componentDidMount () {
    const { requestUsers, currentPage, pageSize } = this.props
    requestUsers(currentPage, pageSize)
  }

  onPageChanged = (pageNumber) => {
    const { requestUsers, pageSize } = this.props
    requestUsers(pageNumber, pageSize)
  }



  render () {
    return  (
      <>
        {this.props.isFetching ? <Preloader />
        :
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            followingInProgress={this.props.followingInProgress}

          />
        }
      </>
    )
  }
}

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress
//   }
// }

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

// let AuthRedirectComponent = withAuthRedirect( UsersContainer)

export default connect(mapStateToProps, {
  requestUsers, follow,
  unfollow
})(UsersContainer)
