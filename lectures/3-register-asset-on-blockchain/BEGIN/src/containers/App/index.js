import React, { Component }   from 'react'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import injectTapEventPlugin   from 'react-tap-event-plugin'
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider'
import muiTheme               from './styles/theme/mui-theme'
import { HashRouter,
         Route,
         Redirect,
         Switch }             from 'react-router-dom'
import Web3                   from 'web3'

/*
 * Import global styles into entire app
 */
import './styles/app.scss'

import * as providerActionCreators from 'core/actions/actions-provider'

/* application containers & components */
import Header           from 'containers/Header'
import LeftNavBar       from 'containers/LeftNavBar'
import HomeView         from 'containers/HomeView'
import ListView         from 'containers/ListView'
import RegisterView     from 'containers/RegisterView'

injectTapEventPlugin()

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props

    if (typeof window.web3 !== 'undefined') {
      const currentProvider = window.web3.currentProvider
      const web3Provider = new Web3(currentProvider)
      actions.provider.setProvider(web3Provider)
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <HashRouter>
            <div>
              <Header />
              <div className="container">
                <div id="main">
                  <Switch>
                    <Route path="/home" component={HomeView} />
                    <Route path="/assets" component={ListView} />
                    <Route path="/register" component={RegisterView} />
                    <Redirect from="/" to="/home" />
                  </Switch>
                </div>
              </div>
              <LeftNavBar />
            </div>
          </HashRouter>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
