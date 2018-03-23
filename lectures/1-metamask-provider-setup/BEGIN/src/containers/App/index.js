import React, { Component }   from 'react'
import injectTapEventPlugin   from 'react-tap-event-plugin'
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider'
import muiTheme               from './styles/theme/mui-theme'
import { HashRouter,
         Route,
         Redirect,
         Switch }             from 'react-router-dom'

/*
 * Import global styles into entire app
 */
import './styles/app.scss'


/* application containers & components */
import Header           from 'containers/Header'
import LeftNavBar       from 'containers/LeftNavBar'
import HomeView         from 'containers/HomeView'
import ListView         from 'containers/ListView'
import RegisterView     from 'containers/RegisterView'

injectTapEventPlugin()

export class App extends Component {
  constructor(props) {
    super(props)
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

export default App
