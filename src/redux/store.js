import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 10 },
        { id: 2, message: 'Its my first post', likesCount: 15 },
        { id: 2, message: 'Dada', likesCount: 15 },
        { id: 2, message: 'Ok', likesCount: 8 }
      ],
      newPostText: "it-kamasutra.com"
    },
    dialogPage: {
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

      ],
      newMessageText: ''
    },
    sidebar: {
      friends: [
        { id: 1, name: 'Dimuch', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
        { id: 2, name: 'Andreu', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
        { id: 3, name: 'Sveta', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
      ]
    }
  },
  _callSubscriber() {
    console.log("StATE change")
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._callSubscriber(this._state)

  },
}



window.store = store

export default store

