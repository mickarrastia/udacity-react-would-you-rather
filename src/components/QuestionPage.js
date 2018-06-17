import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAnswer} from '../actions/shared'
import {deregisterVote} from '../actions/questions'

class QuestionPage extends Component {

  handleChange = (e) => {
    const answer = e.target.value
    const {dispatch, authedUser, qid} = this.props
    const previousAnswer = this.props.answer

    if (previousAnswer !== undefined && previousAnswer !== null && previousAnswer !== answer) {
      dispatch(deregisterVote({authedUser, qid, previousAnswer}))
    }

    dispatch(handleAnswer({authedUser, qid, answer}))
  }

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

  displayOption = (optionKey, optionText, qid, answer) => {
    return (<div className='question-option'>
      <input
        className='question-checkbox'
        value={optionKey}
        type='checkbox'
        checked={answer === optionKey}
        onChange={this.handleChange}/>
      <label className='question-label' htmlFor='optionOne'>{optionText}</label>
      <div className='option-stats'>
        {answer !== undefined && answer !== null && this.getStats(qid, optionKey)}
      </div>
    </div>
    )
  }

  render() {
    const {qid, author, avatarURL, answer, optionOneText, optionTwoText} = this.props

    return (
      <div>
        <h2 className='center'>Would You Rather</h2>
        <div className='question'>
          <img
            src={avatarURL}
            alt={`Avatar of ${author}`}
            className='avatar'
          />
          <div className='question-info'>
            {this.displayOption('optionOne', optionOneText, qid, answer)}
            {this.displayOption('optionTwo', optionTwoText, qid, answer)}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, props) {
  const {id} = props.match.params
  const question = questions[id]
  const author = question.author
  return {
    authedUser,
    qid: id,
    author,
    avatarURL: users[author].avatarURL,
    answer: users[authedUser].answers[id],
    optionOneText: question.optionOne.text,
    optionTwoText: question.optionTwo.text,
    users,
    questions,
  }
}

export default connect(mapStateToProps)(QuestionPage)
