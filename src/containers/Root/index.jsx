import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actionCreators'
import Helmet from 'react-helmet'

import {
	DevPanel,
	MessageForm,
	MessageList } from '../../components'

class Root extends Component{
	static propTypes = {
		actions: PropTypes.object.isRequired,
		sockets: PropTypes.object.isRequired,
		messageList: PropTypes.object.isRequired
	}

	render(){
		const { 
			loaded, 
			connected, 
			message } = this.props.sockets
		const {
			messages
		} = this.props.messageList
		const { 
			socketsConnect, 
			socketsDisconnect, 
			socketsSend } = this.props.actions
		return (
			<div className="container">
				<Helmet title="Chat app"/>
				<MessageList
					messages={messages}/>
				<MessageForm
					send={socketsSend}/>
				<DevPanel
					loaded={loaded}
					connected={connected}
					message={message}
					connect={socketsConnect}
					disconnect={socketsDisconnect}/>
			</div>
		)	
	}
}

function mapStateToProps(state) {
	return Object.assign({}, state)
}

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)