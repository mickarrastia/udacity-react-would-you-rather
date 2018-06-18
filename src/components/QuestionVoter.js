import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAnswer} from '../actions/shared'
import {deregisterVote} from '../actions/questions'
import OptionSelector from './OptionSelector'

class QuestionVoter extends Component {

  handleSelection = (e) => {
    const answer = e.target.value
    const {dispatch, authedUser, qid} = this.props
    const previousAnswer = this.props.answer

    if (previousAnswer !== undefined && previousAnswer !== null && previousAnswer !== answer) {
      dispatch(deregisterVote({authedUser, qid, previousAnswer}))
    }

    dispatch(handleAnswer({authedUser, qid, answer}))
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
            <OptionSelector value={'optionOne'} text={optionOneText} qid={qid} answer={answer} selectionHandler={this.handleSelection}/>
            <OptionSelector value={'optionTwo'} text={optionTwoText} qid={qid} answer={answer} selectionHandler={this.handleSelection}/>
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
    questions,
    users,
    authedUser,
    qid: id,
    author,
    avatarURL: users[author].avatarURL,
    answer: users[authedUser].answers[id],
    optionOneText: question.optionOne.text,
    optionTwoText: question.optionTwo.text
  }
}

export default connect(mapStateToProps)(QuestionVoter)
