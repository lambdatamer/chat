import React, { Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as actionCreators from '../../actionCreators'
import Helmet from 'react-helmet'
import './style.css'

class Nav extends Component {
  componentDidMount(){
    const { history } = this.props
    if(!localStorage['nickname']){
      history.push('/login')
    }else{
      history.push('/chat')
    }
  }
  render(){
    return(
      <div>
        <Helmet title="Chat app"
          meta={[
            {name: 'viewport', content: 'width=device-width, initial-scale=1'}
          ]}
        />
      </div>
    )
  }
}

Nav.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Nav.propTypes = {
  history: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return Object.assign({}, state)
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

const navWithRouter = withRouter(Nav)

export default connect(mapStateToProps, mapDispatchToProps)(navWithRouter)
