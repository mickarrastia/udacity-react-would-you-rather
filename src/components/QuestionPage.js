import React, {Component} from 'react'
import {connect} from 'react-redux'

class QuestionPage extends Component {
  handleChange = (e) => {
    e.preventDefault()
    const answer = e.target.value
    const {authedUser, qid} = this.props
    console.log({authedUser, qid, answer})

    //TODO: dispatch answer (but also need to create reducer)
  }

  render() {
    const {author, avatarURL, answeredOption, optionOne, optionTwo} = this.props
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
              checked={answeredOption === 'optionOne'}
              onChange={this.handleChange}/>
            <label htmlFor='optionTwo'>{optionOne}</label>
          </div>
          <div>
            <input
              value='optionTwo'
              type='checkbox'
              checked={answeredOption === 'optionTwo'}
              onChange={this.handleChange}/>
            <label htmlFor='optionTwo'>{optionTwo}</label>
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
    answeredOption: users[authedUser].answers[id],
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text
  }
}

export default connect(mapStateToProps)(QuestionPage)
