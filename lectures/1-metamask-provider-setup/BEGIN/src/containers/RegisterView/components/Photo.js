import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { Paper }            from 'material-ui'
import imagePlaceholderSvg  from 'assets/images/image-placeholder.svg'
import ProgressIndicator    from 'components/ProgressIndicator'
import { getString }        from 'core/utils/util-assets'

/* component styles */
import { photoStyles } from './styles.scss'

class Photo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainImage: null,
      imageContainer: <ProgressIndicator
                        type="circle"
                        size={60}
                        thickness={6} />
    }
  }

  componentDidMount() {
    this.setImage()
    this.showImage()
  }

  render() {
    const { imageContainer } = this.state

    return (
      <div className={photoStyles}>
        <div id="image-container">
          <Paper zDepth={1}>
            <div id="image-preview">
              {imageContainer}
            </div>
          </Paper>
        </div>
      </div>
    )
  }

  setImage=() => {
    const { asset } = this.props

    if (!asset.stagedAsset) {
      this.setState({ mainImage: <img className="placholder-image" src={imagePlaceholderSvg} /> })
    } else {
      getString(asset.stagedAsset, (imageUrl) => {
        this.setState({ mainImage: <img className="uploaded-image" src={imageUrl} /> })
      })
    }
  }

  showImage=() => {
    setTimeout(() => {
      const { mainImage } = this.state
      this.setState({ imageContainer: mainImage })
    }, 500)
  }
}

Photo.propTypes = {
  asset: PropTypes.object
}

export default Photo
