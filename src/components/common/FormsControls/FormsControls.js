import React from 'react'

import styles from './FormsControls.module.css'

const FormControl = ({input, meta, ...props}) => {
  const hasError = meta.error && meta.touched

  return (
    <div className={styles.formControl + " " +  (hasError ? styles.error : " ") }>
      <div>
        {props.children}
      </div>
      { hasError && (
          <span>{meta.error}</span>
        )
      }
    </div>
  )
}

export const Textarea = (props) => {
  return (
    <FormControl {...props}><textarea {...props} /></FormControl>
  )
}

export const Input = (props) => {
  const {input, ...restProps} = props

  return (
    <FormControl {...props}><input {...input} {...restProps} /></FormControl>
  )
}