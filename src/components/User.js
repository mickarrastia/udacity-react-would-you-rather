import React, {Component} from 'react'
import {getNumberAnswered, getNumberAsked} from '../utils/helpers'

class User extends Component {
  render() {
    const user = this.props.user
    return (
      <div className='user'>
        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.name}`}
          className='avatar'
        />
        <div className='user-stats'>
          <p>{user.name}</p>
          <p>{getNumberAsked(user)} questions asked</p>
          <p>{getNumberAnswered(user)} questions answered</p>
        </div>
      </div>
    )
  }
}

export default User
