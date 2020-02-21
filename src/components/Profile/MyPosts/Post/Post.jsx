import React from 'react'
import s from '../../Profile.module.css'

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg" alt=""/>
      {props.message}
      <div>
        <span>{props.likesCount}</span>
      </div>
    </div>
  )
}

export default Post
