import React, { useEffect, useState } from 'react'

const ProfileStatusWithHooks = (props) => {

  // state = {
  //   editMode: false,
  //   status: this.props.status
  // }

  const [status, setStatus] = useState(props.status)
  const [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode( true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }
  const onStatusChange = (e) => {
    setStatus(
       e.currentTarget.value
    )
  }

  useEffect(() => {
    if(status !== props.status) {
      setStatus(props.status)
    }
  }, [props.status])



    return (
      <div>
        {!editMode &&
          <div>
            <span
              onDoubleClick={activateEditMode}>
              {status || "-------"}</span>
          </div>
        }
        {editMode &&
          <div>
            <input
              onChange={onStatusChange}
              autoFocus={true}
              onBlur={deactivateEditMode}
              value={status} />
          </div>
        }
      </div>
    )

}

export default ProfileStatusWithHooks
