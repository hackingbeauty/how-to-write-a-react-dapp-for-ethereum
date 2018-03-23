import React, { Component }  from 'react'
import PropTypes             from 'prop-types'
import {
  CircularProgress,
  LinearProgress
}                            from 'material-ui'
import { getStyles }         from 'core/utils/util-styles'

/* component styles */
import { styles } from './styles.scss'

class ProgressIndicator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, thickness, size, mode, color } = this.props
    let progressIndicator

    switch(type){
    case 'circle':
      progressIndicator = <CircularProgress type={type} thickness={thickness} size={size} color={color} />
      break
    case 'linear':
      progressIndicator = <LinearProgress type={type} mode={mode} color={color} />
      break
    }

    return (
      <div className={styles}>
        <div className="progress-indicator">
          {progressIndicator}
        </div>
      </div>
    );
  }
}

ProgressIndicator.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  thickness: PropTypes.number
}

ProgressIndicator.defaultProps = {
  type: 'circle',
  size: 20,
  thickness: 1,
  color: getStyles('$lightBlue')
}

export default ProgressIndicator
