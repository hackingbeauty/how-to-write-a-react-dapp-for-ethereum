import React, { Component }           from 'react'
import PropTypes                      from 'prop-types'
import {
  DragDropContext as dragDropContext,
  DragDropContextProvider }           from 'react-dnd'
import HTML5Backend, { NativeTypes }  from 'react-dnd-html5-backend'
import DropTarget                     from './DropTarget'

import { styles } from './styles.scss'

@dragDropContext(HTML5Backend)
class UploadBox extends Component {
  constructor(props) {
    super(props)
    this.state = { droppedFiles: [] }
  }

  render() {
    const { FILE } = NativeTypes
    const { droppedFiles } = this.state

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={styles}>
          <DropTarget
            setUploadedFile={this.setUploadedFile}
            accepts={[FILE]}
            onDrop={this.handleFileDrop}
            files={droppedFiles} />
        </div>
      </DragDropContextProvider>
    )
  }

  setUploadedFile=(file) => {
    const { setUploadedFile } = this.props
    setUploadedFile(file)
  }

  handleFileDrop= (item, monitor) => {
    const { onDrop } = this.props

    if (monitor) {
      const droppedFiles = monitor.getItem().files
      this.setState({ droppedFiles })
      this.setUploadedFile(droppedFiles)
    }

    onDrop()
  }
}

UploadBox.propTypes = {
  onDrop: PropTypes.func.isRequired,
  setUploadedFile: PropTypes.func.isRequired
}

export default UploadBox
