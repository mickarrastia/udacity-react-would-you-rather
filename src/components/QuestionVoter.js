import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAnswer} from '../actions/users'
import OptionSelector from './OptionSelector'
import NoMatch from './NoMatch'

class QuestionVoter extends Component {

  handleSelection = (e) => {
    const answer = e.target.value
    const {dispatch, authedUser, qid} = this.props
    dispatch(handleAnswer({authedUser, qid, answer}))
  }

  render() {
    const {authedUser, qid, questions, users} = this.props
    const question = questions[qid]

    if (!question) {
      return <NoMatch location={this.props.location}/>
    }

    const author = question.author
    const avatarURL = users[author].avatarURL
    const answer = users[authedUser].answers[qid]
    const optionOneText = question.optionOne.text
    const optionTwoText = question.optionTwo.text

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
  return {
    authedUser,
    qid: id,
    questions,
    users
  }
}

export default connect(mapStateToProps)(QuestionVoter)
