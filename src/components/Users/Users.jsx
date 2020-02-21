import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom'
import * as axios from 'axios'
import { userAPI } from '../../api/api'

let Users = (props) => {
  let pagesCont = Math.ceil(props.totalUsersCount / props.pageSize)

  let pages = []

  for(let i = 1; i <= pagesCont; i++) {
    pages.push(i)
  }
  return (
    <div>
      <h2>Users</h2>
      <div>
        {
          pages.map((p) => {
            return (
              <span
                className={props.currentPage === p && styles.selectedPage}
                onClick={() => {props.onPageChanged(p) }}
              > {p}
                </span>
            )
          })
        }


      </div>
      <div>
        {
          props.users.map((u) => {
            return (
              <div key={u.id}>
                  <span>
                    <div>
                    <NavLink to={'/profile/'+ u.id}>
                      <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" className={styles.photo}/>
                    </NavLink>
                    </div>
                    <div>
                      {u.followed
                        ? <button onClick={() => {
                          userAPI.unfollowUser(u.id).then(data => {
                              if(data.resultCode === 0) {
                                props.unfollow(u.id)
                              }
                            })


                        }}>Unfollow</button>

                        : <button onClick={() => {

                          userAPI.followUser(u.id).then(data => {
                            if(data.resultCode === 0) {
                              props.unfollow(u.id)
                            }
                          }).then(data => {

                              if(data.resultCode === 0) {
                                props.follow(u.id)
                              }
                            })
                        }}>Follow</button>}
                    </div>
                  </span>
                <span>
                    <span>
                      <div>{u.name}</div>
                      <div>{u.status}</div>
                    </span>
                    <span>
                      <div>{'u.location.country'}</div>
                      <div>{'u.location.city'}</div>
                    </span>
                  </span>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Users
