import React from 'react'
import s from './UserItem.module.css'



const UserItem = (props) => {


  return (
    <div className={s.userItem}>
      <div className={s.images}>
        <img src={props.user.url} alt=""/>
        <button onClick={props.onFollow}>{props.user.follow}</button>
      </div>
      <div className={s.userInfo}>
        <div className={s.userName} >
          {props.user.name}<br /><br />
          {props.user.logan}
        </div>
        <div className={s.userCity} >
          {props.user.country}<br /><br />
          {props.user.city}
        </div>
      </div>
    </div>
  )
}

export default UserItem
