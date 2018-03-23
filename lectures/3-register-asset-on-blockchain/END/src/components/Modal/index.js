import React, { Component }  from 'react'
import PropTypes             from 'prop-types'
import { Dialog }            from 'material-ui'

/* component styles */
import { styles } from './styles.scss'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentWillReceiveProps= (nextProps) => {
    const { open } = nextProps
    this.setState({ open: open })
  }

  handleClose=() => {
    this.setState({ open: false })
  }

  render() {
    const { actions, title, content, className, customStyles } = this.props
    const mergedStyles = styles + ' ' + className

    return(
      <div>
        <Dialog
          title={title}
          actions={actions}
          className={mergedStyles}
          contentStyle={customStyles}
          modal={false}
          open={this.state.open}
          children={<div className="modal-content">{content}</div>}
          onRequestClose={this.handleClose}>
        </Dialog>
      </div>
    )
  }

}

Modal.propTypes = {
  open      : PropTypes.bool.isRequired,
  actions   : PropTypes.array,
  title     : PropTypes.string,
  uiActions : PropTypes.object,
  content   : PropTypes.element,
  className : PropTypes.string
}

Modal.defaultProps = {
  open  : false,
  title : 'Please confirm'
}


export default Modal