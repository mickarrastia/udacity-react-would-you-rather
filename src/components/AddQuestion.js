import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {handleAddQuestion} from '../actions/users'
import OptionText from './OptionText'

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
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
    const {optionOneText, optionTwoText} = this.state
    const {dispatch} = this.props
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))
  }

  render() {
    const {optionOneText, optionTwoText, toHome} = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h2 className='center'>Would You Rather</h2>

        <form className='new-question' onSubmit={this.handleSubmit}>
          <OptionText placeholder='Option 1' text={optionOneText} changeHandler={this.handleChangeOptionOne}/>
          <p>or</p>
          <OptionText placeholder='Option 2' text={optionTwoText} changeHandler={this.handleChangeOptionTwo}/>
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
