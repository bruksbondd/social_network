import React, { Component, Suspense } from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar'

import { BrowserRouter, Route, withRouter } from 'react-router-dom'

import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import { connect, Provider } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import { compose } from 'redux'
import Preloader from './components/common/preloader/Preloader'
import store from './redux/reduxStore'
import { withSuspense } from './hoc/withSuspense'

// import ProfileContainer from './components/Profile/profileContainer'
// import DialogsContainer from './components/Dialogs/DialogsContainer'
const ProfileContainer = React.lazy(() => import('./components/Profile/profileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

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
          <Route
            path='/dialogs'
            render={withSuspense(DialogsContainer)}
          />
          <Route path='/profile/:userId?'>
            <Suspense fallback={<Preloader/>}>
              <ProfileContainer/>
            </Suspense>
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

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})
) (App)

const SamuraiJSApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp
