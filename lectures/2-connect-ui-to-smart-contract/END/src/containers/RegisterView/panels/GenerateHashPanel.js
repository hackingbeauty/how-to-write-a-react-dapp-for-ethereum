import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter }         from 'react-router-dom'
import ProgressIndicator      from 'components/ProgressIndicator'
import { Link }               from 'react-router-dom'
import { getString }          from 'core/utils/util-assets'
import Controls               from '../components/Controls'

import * as assetActionCreators from 'core/actions/actions-asset'

class GenerateHashPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextBtnDisabled: true
    }
  }

  componentDidMount() {
    const { actions, asset } = this.props

    if (asset.assetHash === '') {
      getString(asset.stagedAsset, (assetUrl) => {
        setTimeout(() => {
          actions.asset.checkIfRegistered(assetUrl)
        }, 2000)
      })
    }

    if (asset.assetHash !== '') {
      this.setState({nextBtnDisabled: false})
    }
  }

  componentWillReceiveProps(nextProps) {
    const { asset } = nextProps

    if (asset.assetHash !== '') {
      this.setState({nextBtnDisabled: false})
    }

    if (asset.alreadyExists) {
      this.setState({nextBtnDisabled: true})
    }
  }

  getControls = () => {
    const { nextBtnDisabled } = this.state
    return (
      <Controls
        prevDisabled={false}
        nextDisabled={nextBtnDisabled}
        handleNext={this.proceed}
      />
    )
  }

  render() {
    const { asset } = this.props
    const { alreadyExists, assetHash, error } = asset
    let content

    if (alreadyExists) {
      content = (
        <div className="notification">
          <h2>Sorry, someone already registered this photo!</h2>
          <span className="action"><Link to="/home">Upload a new photo</Link></span>
        </div>
      )
    } else if (assetHash) {
      content = (
        <div>
          <h2>Unique hash (SHA-256) of your photo asset</h2>
          <span>Click Next to register your asset</span>
          <div id="unique-hash">{assetHash}</div>
        </div>
      )
    } else if (error) {
      content = (
        <div className="notification">
          <h2>Sorry, there's an error!</h2>
          <span className="action"><Link to="/home"> Please try again</Link></span>
        </div>
      )
    } else if (asset.stagedAsset) {
      content = (
        <div>
          <h2>Generating a unique hash of your asset...</h2>
          <div id="hash-progress-indicator">
            <ProgressIndicator type="linear" />
            <span className="blink-me">Please hold on...</span>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="notification">
          <h2>Please upload a photo to register</h2>
          <span className="action"><Link to="/home">Upload a photo</Link></span>
        </div>
      )
    }

    return (
      <div>
        {content}
        {this.getControls()}
      </div>
    )
  }

  proceed = () => {
    const { history } = this.props
    history.push('/register?panel=3')
  }
}

GenerateHashPanel.propTypes = {
  actions: PropTypes.object.isRequired,
  alreadyExists: PropTypes.bool,
  asset: PropTypes.object,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    asset: state.asset
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenerateHashPanel))
