import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter }         from 'react-router-dom'
import { Form, Label, Input } from 'components/Form'
import Controls               from '../components/Controls'

import * as accountActionCreators from 'core/actions/actions-account'

class CredentialsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allowToProceed: false,
      email: '',
      nextBtnDisabled: true
    }
  }

  onEnter = (evt) => {
    if (evt.key === 'Enter') {
      const { allowToProceed } = this.state
      if (allowToProceed) { this.proceed() }
    }
  }

  render() {
    const { id, email } = this.props.account
    const { nextBtnDisabled } = this.state

    return (
      <div>
        <h2>Enter Your Credentials</h2>
        <span>Your email address and account ID will be registered on the Blockchain</span>
        <Form>
          <div className="form-section">
            <Label text="Your Email Address" />
            <Input
              type="email"
              value={email}
              autoFocus
              placeholder="your_email@email.com"
              onKeyPress={this.onEnter}
              checkIfValid={this.enableNext}
            />
          </div>
          <div className="form-section">
            <Label text="Your Account ID (from MetaMask)" />
            <Input
              type="text"
              disabled
              value={id}
            />
          </div>
        </Form>
        <Controls
          prevDisabled
          nextDisabled={nextBtnDisabled}
          handleNext={this.proceed}
        />
      </div>
    )
  }

  proceed = () => {
    const { actions, history } = this.props
    const { email } = this.state

    actions.account.setEmail(email)
    history.push('/register?panel=2')
  }

  enableNext=(input) => {
    const { asset } = this.props

    if (input.valid && asset.stagedAsset) {
      this.setState({
        allowToProceed: true,
        email: input.value,
        nextBtnDisabled: false
      })
    }
  }
}

CredentialsPanel.propTypes = {
  account: PropTypes.object,
  actions: PropTypes.object,
  asset: PropTypes.object,
  history: PropTypes.object
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
      account: bindActionCreators(accountActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CredentialsPanel))
