import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {formatDate} from '../utils/helpers'

class Question extends Component {
  render() {
    const {id, optionOne, optionTwo, timestamp} = this.props
    const questionDate = new Date(timestamp)
    return (
      <Link to={`/questions/${id}`} className={`question pointer`}>
        <div className='question-info'>
          <span className='question-text'>Would you rather {optionOne} or {optionTwo}?</span>
          <div className='question-date'>{formatDate(questionDate)}</div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps({questions}, {id}) {
  const question = questions[id]
  return {
    id,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text,
    timestamp: question.timestamp
  }
}

export default withRouter(connect(mapStateToProps)(Question))
