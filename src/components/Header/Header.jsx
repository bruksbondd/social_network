import React from 'react'
import style from './Header.module.css'
import { Link, NavLink } from 'react-router-dom'

const Header = (props) => {

  return (
      <header className={style.header}>
        <NavLink to='/'>
          <img src="http://mintsplash.net/wp-content/themes/mintsplash/css/images/logo.svg" alt="logo"/>
        </NavLink>
        <div className={style.loginBlock}>

          {props.isAuth

            ? <div>{props.login} <button onClick={props.logout}>Log out</button></div>
            : <NavLink to={'/login'}>Login</NavLink>
          }
        </div>
      </header>
  )
}

export default Header
