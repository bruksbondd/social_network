import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleIsFetching, setUsersTotalCount, setCurrentPage, follow, setUsers, unfollow } from '../../redux/userReducer'
import Users from './Users'
import Preloader from './../common/preloader/Preloader'
import { userAPI } from '../../api/api'

class UsersContainer extends Component{
  componentDidMount () {
    this.props.toggleIsFetching(true)
    userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(data.items)
        this.props.setUsersTotalCount(data.totalCount)
      })
  }

  onPageChanged = (pageNumber) => {
    this.props.toggleIsFetching(true)
    this.props.setCurrentPage(pageNumber)
    userAPI.getUsers(pageNumber, this.props.pageSize)
      .then(data => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(data.items)
      })
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
    isFetching: state.usersPage.isFetching
  }
}
export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage,  setUsersTotalCount, toggleIsFetching})(UsersContainer)
