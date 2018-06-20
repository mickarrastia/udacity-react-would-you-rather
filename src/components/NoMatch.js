import React, {Component} from 'react'

class NoMatch extends Component {
  render() {
    return (
      <div className='not-found'>
        <h1 className='center'>404 - PAGE NOT FOUND</h1>
        <h3 className='center'>No match for <code>{this.props.location.pathname}</code></h3>
      </div>
    )
  }
}

export default NoMatch
