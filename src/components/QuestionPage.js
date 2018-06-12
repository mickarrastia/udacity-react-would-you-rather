import React, {Component} from 'react'
import {connect} from 'react-redux'

class QuestionPage extends Component {
  render() {
    const {optionOne, optionTwo} = this.props
    return (
      <div>
        <h3 className='center'>Would You Rather</h3>
        <div style={{marginLeft: 100 + 'px'}}>
          <div>
            <input type='checkbox' id='optionOne' value='optionOne'/>
            <label htmlFor='optionTwo'>{optionOne}</label>
          </div>
          <div>
            <input type='checkbox' id='optionTwo' value='optionTwo'/>
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
  return {
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text
  }
}

export default connect(mapStateToProps)(QuestionPage)
