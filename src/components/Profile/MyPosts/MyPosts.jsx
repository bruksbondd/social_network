import React from 'react'
import s from '../Profile.module.css'
import Post from './Post/Post'


const MyPosts = (props) => {

  let postsElements = props.posts.map(p =><Post message={p.message} likesCount={p.likesCount}/>)

  const newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost()
  }

  let onPostChange = () => {
    let text = newPostElement.current.value
    props.updateNewPostText(text)

  }

  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText} />
        </div>
        <div>
         <button onClick={onAddPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>

        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts
