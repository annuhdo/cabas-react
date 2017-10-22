import React from 'react'
import {
  Owner
} from '../../styles/'

const UserAvatar = function (props) {
  const photo = props.owner && props.owner.photo
  const name = props.owner && props.owner.name
  return (
    <Owner
      size={props.size}
      circular
      margin={props.margin}>
      <img src={photo} alt={name} />
    </Owner>
  )
}

export default UserAvatar