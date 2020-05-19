import React from 'react'
import preloader from './../../../assets/images/loading.svg'
import style from './Preloader.module.css'

const Preloader = () => {
  return (
    <img className={style.preloader} src={preloader} alt="preloader"/>
  )
}

export default Preloader
