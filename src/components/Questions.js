import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'

class Questions extends Component {

  state = {
    display: 'unanswered'
  }

  displayQuestions = (e) => {
    e.preventDefault()
    const value = e.target.value
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
        <h3 className='center'>Questions</h3>
        <button value='unanswered' onClick={this.displayQuestions} disabled={display==='unanswered'}>Unanswered</button>
        <button value='answered' onClick={this.displayQuestions} disabled={display==='answered'}>Answered</button>
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
