import profileReducer, { addPostActionCreator, deletePost } from './profileReducer'

import React from 'react'

const state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 10 },
    { id: 2, message: 'Its my first post', likesCount: 15 },
    { id: 3, message: 'Dada', likesCount: 15 },
    { id: 4, message: 'Ok', likesCount: 8 }
  ]
}

test('new post should be added', () => {
  let action = addPostActionCreator('it-camasutra')

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(5)
})

test('message of new post should be it-kamasutra', () => {
  let action = addPostActionCreator('it-kamasutra')

  let newState = profileReducer(state, action)

  expect(newState.posts[4].message).toBe('it-kamasutra')
})

test('after deleting length of messages should be decrement', () => {
  let action = deletePost(1)

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(3)
})

test(`after deleting length shouldn' be decrement if id is incorrect`, () => {
  let action = deletePost(1000)

  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(4)
})
