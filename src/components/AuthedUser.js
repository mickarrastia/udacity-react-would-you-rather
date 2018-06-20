import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setAuthedUser} from '../actions/authedUser'

class AuthedUser extends Component {

  logout = () => {
    const {dispatch} = this.props
    this.props.history.push('/');
    dispatch(setAuthedUser(''))
  }

  render() {
    const {userName} = this.props
    return (
      <div className='authed-user'>
        <p className='user-name'>{userName}</p>
        <div className='logout' onClick={this.logout}>Logout</div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    userName: authedUser ? users[authedUser].name : ''
  }
}

export default withRouter(connect(mapStateToProps)(AuthedUser))
