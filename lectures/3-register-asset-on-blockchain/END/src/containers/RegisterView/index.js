import React, { Component }         from 'react'
import PropTypes                    from 'prop-types'
import { connect }                  from 'react-redux'
import { bindActionCreators }       from 'redux'
import Photo                        from './components/Photo'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import CredentialsPanel             from './panels/CredentialsPanel'
import GenerateHashPanel            from './panels/GenerateHashPanel'
import RegisterAssetPanel           from './panels/RegisterAssetPanel'
import SuccessPanel                 from './panels/SuccessPanel'

/* component styles */
import { styles } from './styles.scss'

import * as accountActionCreators from 'core/actions/actions-account'
import * as assetActionCreators   from 'core/actions/actions-asset'

class RegisterView extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.account.clear()
    actions.asset.clear()
  }

  getPanel = () => {
    const { location } = this.props
    return parseInt(location.search.substr(1).split('=')[1], 10)
  }

  renderContent() {
    const panel = this.getPanel()

    switch (panel) {
    case 1:
      return <CredentialsPanel />
    case 2:
      return <GenerateHashPanel />
    case 3:
      return <RegisterAssetPanel />
    case 4:
      return <SuccessPanel />
    default:
      break
    }
  }

  render() {
    const { asset } = this.props
    const panel = this.getPanel()

    return (
      <div className={styles}>
        <div id="register-view">
          <Photo asset={asset} />
          <div id="registration-form-container">
            <Stepper activeStep={panel - 1}>
              <Step><StepLabel>Enter Credentials</StepLabel></Step>
              <Step><StepLabel>Generate Unique Hash</StepLabel></Step>
              <Step><StepLabel>Register</StepLabel></Step>
            </Stepper>
            <div id="registration-form">{this.renderContent()}</div>
          </div>
        </div>
      </div>
    )
  }

}

RegisterView.propTypes = {
  asset: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  location: PropTypes.object
}

function mapStateToProps(state) {
  return {
    asset: state.asset
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      account: bindActionCreators(accountActionCreators, dispatch),
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView)
