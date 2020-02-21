import React from 'react'

import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'

import { connect } from 'react-redux'

let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessageClick: () => {
      dispatch(addMessageActionCreator())
    },
    newMessageChange: (body) => {
      dispatch(updateNewMessageTextActionCreator(body))

    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
