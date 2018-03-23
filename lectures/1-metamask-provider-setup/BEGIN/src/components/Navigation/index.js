import React, { Component } from 'react'
import { withRouter }       from 'react-router-dom'
import { Tabs, Tab }        from 'material-ui'
import HomeIcon             from 'material-ui/svg-icons/action/home'
import ListenIcon           from 'material-ui/svg-icons/action/list'

/* component styles */
import { styles } from './styles.scss'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRoute: ''
    }
  }

  componentDidMount() {
    const { pathname } = this.props.location
    this.handleChange(pathname, false)
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location
    this.handleChange(pathname, false)
  }

  handleChange=(pathname, updateURL) => {
    let path

    if(pathname === '/') {
      path = '/home'
    } else {
      path = pathname
    }

    this.setState({ currentRoute: path })

    if(updateURL !== false) { this.pushRoute(path) }
  }

  pushRoute(path){
    const { history } = this.props
    history.push(path)
  }

  render() {
    const { currentRoute } = this.state


    return(
      <div className={styles}>
        <Tabs
          className="tabs"
          value={currentRoute}
          onChange={this.handleChange}>
          <Tab
            icon={<HomeIcon />}
            label="Home"
            value={'/home'}>
          </Tab>
          <Tab
            icon={<ListenIcon />}
            label="Your Assets"
            value={'/assets'}>
          </Tab>
        </Tabs>
      </div>
    )
  }

}

export default withRouter(Navigation)