const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType = {
    id: number
    name: string
    url: string
}

type MessagesType = {
    id: number
    message: string
}

const initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is you Kamasutra' },
    { id: 3, message: 'You' },
    { id: 4, message: 'You' },
    { id: 5, message: 'You' },
    { id: 7, message: 'You' },
  ] as Array<MessagesType>,
  dialogs: [
    { id: 1, name: 'Dimuch', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 2, name: 'Andreu', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 3, name: 'Sveta', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 4, name: 'Saha', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 5, name: 'Viktor', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 7, name: 'Valera', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },

  ] as Array<DialogType>
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
        let body = action.newMessageBody;
      return {
        ...state,
          messages: [...state.messages, {id: 7, message: body}]
      };

    default:
      return state
  }
}

type ActionsTypes = sendMessageCreatorActionType

type sendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorActionType => {
    return {type: SEND_MESSAGE, newMessageBody}
};


export default dialogsReducer
