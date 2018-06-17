import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'

class Questions extends Component {

  state = {
    display: 'unanswered'
  }

  displayQuestions = (e) => {
    e.preventDefault()
    const value = e.target.getAttribute('value')
    this.setState(() => ({
        display: value
      }
    ))
  }

  render() {
    const {display} = this.state
    const questions = display === 'unanswered' ? this.props.unansweredQuestions : this.props.answeredQuestions
    return (
      <div>
        <h2 className='center'>Questions</h2>
        <div className='question-buttons'>
          <div onClick={this.displayQuestions}
             className={display === 'unanswered' ? 'button-selected' : 'button-deselected'}
             value='unanswered'>Unanswered</div>
          <div onClick={this.displayQuestions}
             className={display === 'answered' ? 'button-selected' : 'button-deselected'}
             value='answered'>Answered</div>
        </div>
        <ul className='questions-list'>
          {questions.map((id) => (
            <li key={id}>
              <Question id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function sortQuestions(questions) {
  return Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
}

function mapStateToProps({questions, users, authedUser}) {
  const questionIds = sortQuestions(questions)
  const answers = Object.keys(users[authedUser].answers)
  const answeredQuestions = questionIds.filter((questionId) => {
    return answers.includes(questionId)
  })
  const unansweredQuestions = questionIds.filter((questionId) => {
    return !answers.includes(questionId)
  })
  return {
    answeredQuestions,
    unansweredQuestions
  }
}

export default connect(mapStateToProps)(Questions)
