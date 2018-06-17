import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Questions from './Questions'
import QuestionPage from './QuestionPage'
import AddQuestion from './AddQuestion'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Nav/>
          {this.props.loading === true
            ? null
            : <div>
              <Route path='/' exact component={Questions}/>
              <Route path='/questions/:id' component={QuestionPage} />
              <Route path='/add' component={AddQuestion} />
            </div>
          }
        </div>
      </Router>
    )
  }
}

function mapsStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapsStateToProps)(App)
