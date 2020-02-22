import React from 'react'
import style from './ProfileInfo.module.css'
import Preloader from '../../common/preloader/Preloader'
import userPhoto from '../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }

  return (
    <div className={style.profileInfo}>
      {/*<img*/}
      {/*  className={style.photoTop}*/}
      {/*  src="http://balkanfun.mk/wp-content/uploads/2018/02/cameo-island-tranquil-zante-beach-resort-destination-greece.jpg"*/}
      {/*  alt=""/>*/}
      <div className={style.descriptionBlock}>
        <img src={props.profile.photos.large? props.profile.photos.large : userPhoto} alt='user'/>
        <h4>{props.profile.fullName}</h4>
        <p>About: {props.profile.aboutMe}</p>
        <h5>looking for a Job: {props.profile.lookingForAJob ? 'Yes' : 'No'}</h5>
        <ProfileStatus
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  )
}

export default ProfileInfo
