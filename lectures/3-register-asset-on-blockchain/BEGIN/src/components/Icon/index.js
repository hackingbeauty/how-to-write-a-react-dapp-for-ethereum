import React           from 'react'
import PropTypes       from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUpload }    from '@fortawesome/fontawesome-free-solid'

/* component styles */
import { styles } from './styles.scss'

const fontAwesomeIcons = {
  upload: faUpload
}

const Icon = props => {
  const { icon, className } = props

  return (
    <div className={`${styles} ${className}`}>
      <div className="icon">
        <FontAwesomeIcon icon={fontAwesomeIcons[icon]} />
      </div>
    </div>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired
}

export default Icon
