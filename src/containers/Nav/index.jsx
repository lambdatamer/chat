import React, { Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actionCreators'
import Helmet from 'react-helmet'
import './style.css'

class Nav extends Component {
	componentDidMount(){

		if(!localStorage['nickname']){
			this.context.router.push('/hello')
		}else{
			this.context.router.push('/chat')
		}
	}
	render(){
		return(
			<div>
				<Helmet title="Chat app"/>
				{this.props.children}
			</div>
		)
	}
}

Nav.contextTypes = {
	router: React.PropTypes.object.isRequired
}

Nav.propTypes = {

}

function mapStateToProps(state){
	return Object.assign({}, state)
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
