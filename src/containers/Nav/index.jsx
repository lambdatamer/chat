import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actionCreators'
import Helmet from 'react-helmet'
import { NavLink } from '../../components'
import './style.css'

class Nav extends Component {
	componentDidMount() {
		const ls = window.localStorage
		if(!ls['nickname']){
			this.context.router.push('/hello')
		}else{
			this.context.router.push('/chat')
		}
	}
	render() {
		return (
			<div>
				<Helmet title="Chat app"/>
				<nav className="navbar navbar-default container">
					<div className="container-fluid">
						<ul className="nav navbar-nav">
							<li><NavLink 
								to="/chat"
								>Chat</NavLink></li>
							<li><NavLink 
								to="/nickname"
								>Nickname</NavLink></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li><NavLink 
								to="/about"
								>About</NavLink></li>
						</ul>
					</div>
				</nav>
				<div className="container">
					{this.props.children}
				</div>
			</div>
		)
	}
}

Nav.contextTypes = {
	router: PropTypes.object.isRequired
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