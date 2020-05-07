const initialState = {
  friends: [
    { id: 1, name: 'Dimuch', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 2, name: 'Andreu', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
    { id: 3, name: 'Sveta', url: 'https://cdn.pixabay.com/photo/2016/09/22/16/38/avatar-1687700_960_720.jpg' },
  ] as Array<Object>
}
type initialStateType = typeof initialState
const sidebarReducer = (state = initialState, action: any): initialStateType => {
  return state
}


export default sidebarReducer
