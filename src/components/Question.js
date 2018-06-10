import React, {Component} from 'react'
import {connect} from 'react-redux'

class Question extends Component {
  render() {
    const {optionOne, optionTwo} = this.props
    return (
      <div className='question'>
        Would you rather {optionOne} or {optionTwo}?
      </div>
    )
  }
}

function mapStateToProps({questions}, {id}) {
  const question = questions[id]
  return {
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text
  }
}

export default connect(mapStateToProps)(Question)
