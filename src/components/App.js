import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import AuthedUser from './AuthedUser'
import Login from './Login'
import Questions from './Questions'
import QuestionVoter from './QuestionVoter'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import NoMatch from './NoMatch'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const isAuthed = this.props.authedUser ? true : false
    return (
      <Router>
        <div className='container'>
          {isAuthed === true ?
            <div>
              <AuthedUser/>
              <Nav/>
            </div>
            : null
          }
          {this.props.loaded === true ?
            <div>
              <Switch>
                <PrivateRoute authed={isAuthed} path='/' exact component={Questions}/>
                <PrivateRoute authed={isAuthed} path='/questions/:id' component={QuestionVoter}/>
                <PrivateRoute authed={isAuthed} path='/add' component={AddQuestion}/>
                <PrivateRoute authed={isAuthed} path='/leaderboard' component={Leaderboard}/>
                <Route path='/login' component={Login}/>
                <Route path='/no-match' component={NoMatch} />
                <Route component={NoMatch}/>
              </Switch>
            </div>
            : null
          }
        </div>
      </Router>
    )
  }
}

/**
 * Credit to Tyler McGinnis
 * https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4/43171515#43171515
 */
function PrivateRoute({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
      }
    />
  )
}

function mapsStateToProps({authedUser}) {
  return {
    authedUser,
    loaded: authedUser !== null
  }
}

export default connect(mapsStateToProps)(App)
