import React from 'react'
import style from './ProfileInfo.module.css'
import Preloader from '../../common/preloader/Preloader'
import userPhoto from '../../../assets/images/user.png'
// import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader/>
  }

  return (
    <div className={style.profileInfo}>
      <div className={style.descriptionBlock}>
        <img src={profile.photos.large ? profile.photos.large : userPhoto} alt='user'/>
        <h4>{profile.fullName}</h4>
        <p>About: {profile.aboutMe}</p>
        <h5>looking for a Job: {profile.lookingForAJob ? 'Yes' : 'No'}</h5>
        <ProfileStatusWithHooks
          status={status}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  )
}

export default ProfileInfo
