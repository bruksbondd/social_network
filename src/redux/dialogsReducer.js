const SEND_MESSAGE = 'SEND_MESSAGE'

const initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is you Kamasutra' },
    { id: 3, message: 'You' },
    { id: 4, message: 'You' },
    { id: 5, message: 'You' },
    { id: 7, message: 'You' },
  ],
  dialogs: [
    { id: 1, name: 'Dimuch', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 2, name: 'Andreu', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 3, name: 'Sveta', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 4, name: 'Saha', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 5, name: 'Viktor', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 7, name: 'Valera', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },

  ]
}

const dialogsReducer = (state = initialState, action) => {


  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessage
      return {
        ...state,
        messages: [...state.messages, { id: 7, message: body}],

      }

    default:
      return state
  }
}
export const sendMessageCreator = (newMessageBody) => {
  return {type: SEND_MESSAGE , newMessage: newMessageBody }
}


export default dialogsReducer
