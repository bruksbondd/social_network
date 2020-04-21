import React from 'react'
import { Contact } from './ProfileInfo'
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls'
import { reduxForm } from 'redux-form'


import style from './ProfileInfo.module.css'
import styles from '../../Login/Login.module.css'

const ProfileDataForm = ({handleSubmit, profile, error}) => {

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      {error && (
        <div className={styles.formSummaryError}>
          {error}
        </div>
      )}
      <h4>Name:
        {createField('Full name', 'fullName', [], Input)}</h4>
      About Me: {createField("About Me", "aboutMe", [], Input)}
      <h5>looking for a Job:
        { createField("", "lookingForAJob", [], Input, {type: "checkbox"})}</h5>

      <div>
        <b>My professional skills</b>:
        {createField("About Me", "lookingForAJobDescription", [], Textarea)}
      </div>

      <div>
        <b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
        return (
          <div key={key} className={style.contact} >
            <b>{key} : {createField(key, 'contacts.' + key, [], Input)}</b>

          </div>
        )
      })}
      </div>
    </form>
  )
}

export default reduxForm({form: 'edit-profile'})(ProfileDataForm)
