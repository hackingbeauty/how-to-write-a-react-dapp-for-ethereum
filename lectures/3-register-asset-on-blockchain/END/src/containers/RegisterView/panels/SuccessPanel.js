import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter, Link } from 'react-router-dom'

class SuccessPanel extends Component {
  render() {
    return (
      <div className="notification">
        <h2>Congratulations! Your photo was successfully registered.</h2>
        <span className="action"><Link to="/assets">See your photo assets</Link></span>
      </div>
    )
  }
}

SuccessPanel.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(SuccessPanel)
