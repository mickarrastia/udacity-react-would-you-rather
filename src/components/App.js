import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Questions from './Questions'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        {this.props.loading === true
          ? null
          : <Questions/>
        }
      </div>
    )
  }
}

function mapsStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapsStateToProps)(App)
