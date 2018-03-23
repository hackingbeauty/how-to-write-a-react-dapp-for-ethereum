import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter }         from 'react-router-dom'
import Controls               from '../components/Controls'

import * as assetActionCreators from 'core/actions/actions-asset'

class RegisterAssetPanel extends Component {
  constructor(props) {
    super(props)
    const { email, id  } = props.account
    const { assetHash } = props.asset

    this.state = {
      nextBtnDisabled: (email && id && assetHash ) ? false : true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asset.transaction) {
      const { history } = this.props
      history.push('/register?panel=4')
    }
  }

  render() {
    const { id, email } = this.props.account
    const { assetHash } = this.props.asset
    const { nextBtnDisabled } = this.state

    return (
      <div>
        <h2>Confirm Transaction</h2>
        <span>Summary of your information</span>
        <div id="registration-details">
          <ul>
            <li>
              <span>Your Email:</span>
              <span>{email}</span>
            </li>
            <li>
              <span>MetaMask ID:</span>
              <span>{id}</span>
            </li>
            <li>
              <span>Unique Hash <br />of Photo:</span>
              <span>{assetHash}</span>
            </li>
          </ul>
        </div>
        <Controls
          prevDisabled={false}
          nextDisabled={nextBtnDisabled}
          nextLabel="Register"
          handleNext={this.registerAsset}
        />
      </div>
    )
  }

  registerAsset = () => {
    const { actions } = this.props
    actions.asset.register()
  }

}

RegisterAssetPanel.propTypes = {
  account: PropTypes.object,
  actions: PropTypes.object,
  asset: PropTypes.object,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    account: state.account,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterAssetPanel))
