import React, {Component} from 'react'
import {connect} from 'react-redux'

class OptionSelector extends Component {

  getTotalVotes = (qid, answer) => {
    const {questions} = this.props
    return questions[qid][answer].votes.length
  }

  getPercentageVotes = (qid, answer) => {
    const {users} = this.props
    const numberUsers = Object.keys(users).length
    return Math.round(this.getTotalVotes(qid, answer) / numberUsers * 100)
  }

  getStats = (qid, answer) => {
    const totalVotes = this.getTotalVotes(qid, answer)
    const percentageVotes = this.getPercentageVotes(qid, answer)
    const totalVotesText = totalVotes > 1 || totalVotes === 0 ? 'votes' : 'vote'
    return (
      <div>
        <p>{totalVotes} {totalVotesText}</p>
        <p>{percentageVotes}% of users</p>
      </div>
    )
  }

  render() {
    const {value, text, qid, answer, selectionHandler} = this.props
    return (
      <div className='question-option'>
        <input
          className='question-checkbox'
          value={value}
          type='checkbox'
          checked={answer === value}
          onChange={selectionHandler}
          disabled={answer ? true : false}/>
        <label className='question-label' htmlFor={value}>{text}</label>
        <div className='option-stats'>
          {answer !== undefined && answer !== null && this.getStats(qid, value)}
        </div>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, props) {
  const {value, text, qid, answer, selectionHandler} = props
  return {
    value,
    text,
    qid,
    answer,
    selectionHandler,
    users,
    questions,
  }
}

export default connect(mapStateToProps)(OptionSelector)
