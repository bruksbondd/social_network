import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  follow,
  unfollow,
  getUsers
} from '../../redux/userReducer'
import Users from './Users'
import Preloader from './../common/preloader/Preloader'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import Dialogs from '../Dialogs/Dialogs'

class UsersContainer extends Component{
  componentDidMount () {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
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

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
  }
}

let AuthRedirectComponent = withAuthRedirect( UsersContainer)

export default connect(mapStateToProps, {
  getUsers, follow,
  unfollow})(AuthRedirectComponent)
