import React from 'react'
import s from '../Profile.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validator/validators'
import { Textarea } from '../../common/FormsControls/FormsControls'

const maxLength10 = maxLengthCreator(10)

const MyPosts = (props) => {

  let postsElements = props.posts.map(p =><Post message={p.message} likesCount={p.likesCount}/>)

  const addNewPost = (value) => {

    props.addPost(value.newPostText)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
      <div>
        <AddPostFormRedux onSubmit={addNewPost} />
      </div>
      <div className={s.posts}>

        {postsElements}
      </div>
    </div>
  )
}

const addNewPostForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
          <Field
            placeholder="Add message"
            name="newPostText"
            component={Textarea}
            validate={[required, maxLength10]}
          />
          <div>
            <button >Add post</button>
          </div>
  </form>
  )
}

const AddPostFormRedux = reduxForm({
  form: 'ProfileAddNewPostForm'
})(addNewPostForm)

export default MyPosts
