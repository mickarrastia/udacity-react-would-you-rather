import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleUserAnswer} from '../actions/users'

class QuestionPage extends Component {
  handleChange = (e) => {
    const answer = e.target.value
    const {dispatch, authedUser, qid} = this.props
    dispatch(handleUserAnswer({authedUser, qid, answer}))

    // TODO: dispatch handleVoteUpdate for question action and reducer
  }

  render() {
    const {author, avatarURL, answer, optionOne, optionTwo} = this.props
    return (
      <div>
        <h3 className='center'>Would You Rather</h3>
        <div style={{marginLeft: 100 + 'px'}}>
          <img
            src={avatarURL}
            alt={`Avatar of ${author}`}
            className='avatar'
          />
          <div>
            <input
              value='optionOne'
              type='checkbox'
              checked={answer === 'optionOne'}
              onChange={this.handleChange}/>
            <label htmlFor='optionTwo'>{optionOne}</label>
          </div>
          <div>
            <input
              value='optionTwo'
              type='checkbox'
              checked={answer === 'optionTwo'}
              onChange={this.handleChange}/>
            <label htmlFor='optionTwo'>{optionTwo}</label>
          </div>
          {answer !== undefined && answer !== null && (
            <div>Stats go here</div>
          )}
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
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text
  }
}

export default connect(mapStateToProps)(QuestionPage)
