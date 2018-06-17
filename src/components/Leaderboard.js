import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getNumberAsked, getNumberAnswered} from '../utils/helpers'
import User from './User'

class Leaderboard extends Component {
  render() {
    const {userIds, users} = this.props
    return (
      <div>
        <h2 className='center'>Leaderboard</h2>
        <ul className='users-list'>
          {userIds.map((id) => (
            <li key={id}>
              <User user={users[id]}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function getUserTotals(user) {
  return getNumberAsked(user) + getNumberAnswered(user)
}

function sortUsers(users) {
  return Object.keys(users)
    .sort((a, b) => getUserTotals(users[b]) - getUserTotals(users[a]))
}

function mapStateToProps({users}) {
  const userIds = sortUsers(users)
  return {
    userIds,
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
