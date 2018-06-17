import React, {Component} from 'react'
import {connect} from 'react-redux'
//import { handleAddTweet } from '../actions/tweets'
//import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  handleChangeOptionOne = (e) => {
    const optionOneText = e.target.value
    this.setState(() => ({optionOneText}))
  }

  handleChangeOptionTwo = (e) => {
    const optionTwoText = e.target.value
    this.setState(() => ({optionTwoText}))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('Handling submit')
  }

  displayOption = (placeHolder, value, onChange, maxLength, questionLeft) => {
    return (
      <div className='new-question'>
            <textarea
              placeholder={placeHolder}
              value={value}
              onChange={onChange}
              className='textarea'
              maxLength={maxLength}
            />
        {questionLeft <= 50 && (
          <div className='question-length'>
            {questionLeft}
          </div>
        )}
      </div>
    )
  }

  render() {
    const OPTION_MAX_LENGTH = 100
    const {optionOneText, optionTwoText} = this.state
    const questionOneLeft = OPTION_MAX_LENGTH - optionOneText.length
    const questionTwoLeft = OPTION_MAX_LENGTH - optionTwoText.length
    return (
      <div>
        <h2 className='center'>Would You Rather</h2>

        <form className='new-question' onSubmit={this.handleSubmit}>
          {this.displayOption('Option 1', optionOneText, this.handleChangeOptionOne, OPTION_MAX_LENGTH, questionOneLeft)}
          <p>or</p>
          {this.displayOption('Option 2', optionTwoText, this.handleChangeOptionTwo, OPTION_MAX_LENGTH, questionTwoLeft)}
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(AddQuestion)
