import React from 'react'

import { sendMessageCreator } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'

import {withAuthRedirect} from '../../hoc/withAuthRedirect'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { reset } from 'redux-form'



let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText,
  }
}



let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {

      dispatch(sendMessageCreator(newMessageBody))
      dispatch(reset('dialogAddMessageForm'))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)
//
// let AuthRedirectComponent = withAuthRedirect(Dialogs )
//
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
//
// export default DialogsContainer
