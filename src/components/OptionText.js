import React, {Component} from 'react'

class OptionText extends Component {
  render() {
    const {placeholder, text, changeHandler} = this.props
    const OPTION_MAX_LENGTH = 100
    const questionLeft = OPTION_MAX_LENGTH - text.length

    return (
      <div className='new-question'>
            <textarea
              placeholder={placeholder}
              value={text}
              onChange={changeHandler}
              className='textarea'
              maxLength={OPTION_MAX_LENGTH}
            />
        {questionLeft <= 50 && (
          <div className='question-length'>
            {questionLeft}
          </div>
        )}
      </div>
    )
  }
}

export default OptionText
