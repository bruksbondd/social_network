import React, {Component} from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getUserProfile } from '../../redux/profileReducer'
import { Redirect, withRouter } from 'react-router-dom'

class ProfileContainer extends Component{

  componentDidMount () {

    let userId = this.props.match.params.userId
    if(!userId) {
      userId = 2
    }
    this.props.getUserProfile(userId)
  }

  render () {
    if(!this.props.isAuth) return <Redirect to={"/login"} />

    return (
      <Profile {...this.props} profile={this.props.profile}/>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
  }
}
let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent)
