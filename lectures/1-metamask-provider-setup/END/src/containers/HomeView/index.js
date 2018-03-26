import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter }         from 'react-router-dom'
import { UploadBox }          from 'components/UploadBox'
import Button                 from 'components/Button'
import metaMaskImg            from 'assets/images/metamask.png'
import Modal                  from 'components/modal'

/* component styles */
import { styles, metaMaskModalStyles } from './styles.scss'

/* actions */
import * as uiActionCreators    from 'core/actions/actions-ui'
import * as assetActionCreators from 'core/actions/actions-asset'

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileAdded: false,
      asset: null
    }
  }

  onDrop=() => {
    this.setState({
      fileAdded: true
    })
  }

  render() {
    const { ui } = this.props
    const { fileAdded } = this.state

    return (
      <div className={styles}>
        <div id="home-view">
          <UploadBox onDrop={this.onDrop} setUploadedFile={this.setUploadedFile} />
            <div>
              <div id="register-actions">
                <Button
                  onTouchTap={this.registerAsset}
                  label="Register Photo On Blockchain"
                  type="raised"
                  primary
                  disabled={!fileAdded ? true : false}
                />
                <a id="reset" href="#">Reset</a>
              </div>
            </div>
        </div>

        <Modal
          modalKey="install-metamask-modal"
          modalState={ui.modalState}
          title="Your need to install MetaMask!"
          cssModule={metaMaskModalStyles}
        >
          <div>
            <img className="metamask-logo" src={metaMaskImg} alt="MetaMask logo" />
            <div className="message">
              <p>
                <a href="https://metamask.io/" target="_blank">MetaMask</a>
                &nbsp;is a wallet and Chrome extension that allows you to make Ethereum transactions from
                regular websites.
              </p>
              <p>In order to register your asset on the blockchain, you need to have it installed.</p>
              <br />
              <Button
                label="Install MetaMask"
                type="raised"
                primary
                onTouchTap={() => {
                  window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en', '_blank')
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  setUploadedFile=(file) => {
    this.setState({
      asset: file
    })
  }

  registerAsset=() => {
    const { history, actions, provider } = this.props
    const { asset } = this.state

    if (provider.web3Provider !== null) {
      actions.asset.addAsset(asset)
      history.push('/register?panel=1')
    } else {
      actions.ui.showModal({modalKey: 'install-metamask-modal'})
    }
  }
}

HomeView.propTypes = {
  actions: PropTypes.object,
  history: PropTypes.object,
  ui: PropTypes.object
}

function mapStateToProps(state) {
  return {
    provider: state.provider,
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch),
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeView))
