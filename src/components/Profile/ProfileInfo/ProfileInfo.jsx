import React, { useState } from 'react'
import style from './ProfileInfo.module.css'
import Preloader from '../../common/preloader/Preloader'
import userPhoto from '../../../assets/images/user.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  const [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData)
      .then(() => {
        setEditMode(false)
      })


  }

  return (
    <div className={style.profileInfo}>
      <div className={style.descriptionBlock}>
        <img src={profile.photos.large ? profile.photos.large : userPhoto} alt='user'/>
        { isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

        <ProfileStatusWithHooks
          status={status}
          updateStatus={updateStatus}
        />

        { editMode
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}  /> }

      </div>
    </div>
  )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return (
    <>
      {isOwner &&
      <div>
        <button onClick={goToEditMode}>Edit</button>
      </div>
      }
      <h4>{profile.fullName}</h4>
      <p>About Me: {profile.aboutMe}</p>
      <h5>looking for a Job: {profile.lookingForAJob ? 'Yes' : 'No'}</h5>
      { profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
      }

      <div>
        <b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
        return (
          <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        )
      })}
      </div>
    </>
  )
}



export const Contact = ({contactTitle, contactValue}) => {
  if (true) {
    return (
      <div className={style.contact}><b>{contactTitle}</b>: {contactValue} </div>
    )
  }
  return null
}

export default ProfileInfo
