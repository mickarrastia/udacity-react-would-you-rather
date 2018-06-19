import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'

class Login extends Component {
  state = {
    userId: this.props.userIds[0],
    redirectToReferrer: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    this.setState({redirectToReferrer: true})
    dispatch(setAuthedUser(this.state.userId))
  }

  handleChange = (e) => {
    this.setState({userId: e.target.value})
  }

  render() {
    const {userId, redirectToReferrer} = this.state
    const {users, userIds, from} = this.props

    if (redirectToReferrer === true) {
      return <Redirect to={from}
      />
    }

    return (
      <div>
        <h2 className='center'>Would You Rather</h2>
        <form className='login' onSubmit={this.handleSubmit}>
          <select value={userId} onChange={this.handleChange}>
            {userIds.map((uid) => (
              <option key={uid} value={users[uid].id}>{users[uid].name}</option>
            ))}
          </select>
          <input className='login-submit' type="submit" value="Log in"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps({users}, props) {
  return {
    users,
    userIds: Object.keys(users).sort(),
    from: props.location.state ? props.location.state.from : { pathname: '/' }
  }
}

export default connect(mapStateToProps)(Login)
