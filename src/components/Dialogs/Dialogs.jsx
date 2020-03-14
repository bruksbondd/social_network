import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem'
import Message from './Message/Message'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validator/validators'

const maxLength10 = maxLengthCreator(100)

const Dialogs = (props) => {
  const dialogsElements = props.dialogs.map((item) => {
    return (
      <div key={item.id} className={s.dialogsElements}>
        <img src={item.url} alt=""/>
        <DialogItem name={item.name} id={item.id} />
      </div>
    )
  })

  const messagesElements = props.messages.map((item) => {
    return <Message key={item.id + Math.random() * 10 } message={item.message}/>
  })


  const addNewMessage = (value) => {
    props.sendMessage(value.newMessageBody)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage}/>
    </div>
  )
}

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        placeholder='Enter your massage'
        name="newMessageBody"
        component={Textarea}
        validate={[required, maxLength10]}
      />
      <button>AddMessage</button>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({
  form: 'dialogAddMessageForm'
})(AddMessageForm)



export default Dialogs
