import React, { Component } from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/profileContainer'
import { Route, withRouter } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import { compose } from 'redux'
import Preloader from './components/common/preloader/Preloader'

class App extends Component {

  componentDidMount () {
    this.props.initializeApp()
  }

  render () {
    if(!this.props.initialized) {
      return <Preloader/>
    }


    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar/>
        <div className='app-wrapper-content'>
          <Route path='/dialogs'>
            <DialogsContainer/>
          </Route>
          <Route path='/profile/:userId?'>
            <ProfileContainer/>
          </Route>
          <Route path='/news'>News</Route>
          <Route path='/music'>Music</Route>
          <Route path='/users' render={() => <UsersContainer/>}/>
          <Route path='/settings'>Settings</Route>
          <Route path='/login' render={() => <Login/>}/>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})
) (App)

