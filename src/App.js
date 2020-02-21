import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/profileContainer'
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'

const App = (props) => {

  return (
    <div className='app-wrapper'>
      <HeaderContainer/>
      <Navbar  />
      <div className='app-wrapper-content'>
        <Route path='/dialogs'>
          <DialogsContainer />
        </Route>
        <Route path='/profile/:userId?'>
          <ProfileContainer />
        </Route>
        <Route path='/news' >News</Route>
        <Route path='/music'>Music</Route>
        <Route path='/users' render={() => <UsersContainer/>} />
        <Route path='/settings'>Settings</Route>
      </div>

    </div>
  )
}

export default App;
