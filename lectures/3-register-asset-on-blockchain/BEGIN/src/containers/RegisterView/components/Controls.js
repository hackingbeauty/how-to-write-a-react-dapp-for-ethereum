import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import Button               from 'components/Button'

import { controlsStyles } from './styles'

class Controls extends Component {
  render() {
    const { nextLabel, nextDisabled, prevDisabled } = this.props

    return (
      <div className={controlsStyles}>
        <div id="button-controls">
          <Button
            type="raised"
            label={nextLabel}
            primary
            keyboardFocused
            disabled={nextDisabled}
            onClick={this.handleNext}
          />
          <Button
            type="flat"
            label="Back"
            secondary
            disabled={prevDisabled}
            onClick={this.handlePrev}
          />
        </div>
      </div>
    )
  }

  handleNext = () => {
    const { handleNext } = this.props
    handleNext()
  }

  handlePrev = () => {
    const { history, location } = this.props
    const currentPanel = parseInt(location.search.substr(1).split('=')[1], 10)
    history.push(`/register?panel=${currentPanel - 1}`)
  }

}

Controls.propTypes = {
  handleNext: PropTypes.func,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  nextLabel: PropTypes.string,
  nextDisabled: PropTypes.bool,
  prevDisabled: PropTypes.bool
}

Controls.defaultProps = {
  nextLabel: 'Next',
  nextDisabled: true,
  prevDisabled: true
}

export default withRouter(Controls)
