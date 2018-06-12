import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  render() {
    const {id, optionOne, optionTwo} = this.props
    return (
      <Link to={`/questions/${id}`} className='question'>
        Would you rather {optionOne} or {optionTwo}?
      </Link>
    )
  }
}

function mapStateToProps({questions}, {id}) {
  const question = questions[id]
  return {
    id,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text
  }
}

export default withRouter(connect(mapStateToProps)(Question))
