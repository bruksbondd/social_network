import React, {Component} from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getUserProfile, getStatus, updateStatus } from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'

import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

class ProfileContainer extends Component{

  componentDidMount () {

    let userId = this.props.match.params.userId
    if(!userId) {
      userId = this.props.authorizedUserId
      if(!userId) {
        this.props.history.push("/login")
      }
    }
    this.props.getUserProfile(userId)
    // setTimeout(() => {
      this.props.getStatus(userId)
    // }, 1000)

  }

  render () {

    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
  }
}

export default compose(
  connect(mapStateToProps,{getUserProfile, getStatus, updateStatus}),
  withRouter,
  // withAuthRedirect
)(ProfileContainer)
