import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

const Users = ({ totalUsersCount, pageSize, onPageChanged, currentPage, users, follow, unfollow, followingInProgress, ...props }) => {

  return (
    <div>
      <h2>Users</h2>
      <Paginator
        totalItemCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
        currentPage={currentPage}
      />
      <div>
        {
          users.map((user) => {
            return (
              <User user={user} follow={follow} unfollow={unfollow} followingInProgress={followingInProgress}/>
            )
          })
        }
      </div>

    </div>
  )
}

export default Users
