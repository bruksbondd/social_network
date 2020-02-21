import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem'
import Message from './Message/Message'



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

  let onNewMessageChange = (e) => {
    let body = e.target.value
    props.newMessageChange(body)
  }

  let onSendMessageClick = () => {
    props.sendMessageClick()
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
      </div>
      <div>
        <textarea
          placeholder='Enter your massage'
          onChange={onNewMessageChange}
          value={props.newMessageText}
        />
        <button onClick={onSendMessageClick}>AddMessage</button>
      </div>

    </div>

  )
}

export default Dialogs
