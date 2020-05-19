import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = (props) => {


let friend = props.friends.map((f) => {
  return (
    <div key={f.name} className={s.friendItem}>
      <div className={s.friendImg}>
        <img src={f.url} alt=""/>
      </div>
      <div className={s.friendName}>{f.name}</div>
    </div>
  )
})
  return (

    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" activeClassName={s.active}>Dialogs</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.active}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/Music" activeClassName={s.active}>Music</NavLink>
      </div >
      <div className={s.item}>
        <NavLink to="/users" activeClassName={s.active}>Find users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/settings" activeClassName={s.active}>Settings</NavLink>
      </div>

      <div className={s.navFriends}>
        <h2>Friends</h2>
        <div className={s.friendsBlock}>
          {friend}
        </div>
      </div>

    </nav>


  )
}

const mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friends
  }
}


export default connect(mapStateToProps)(Navbar)
