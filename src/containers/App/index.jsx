import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actionCreators'
import './style.css'

import {
	DevPanel,
	MessageWindow,
	UsersList } from '../../components'

class App extends Component{

	render(){
		const {
			sockets,
			messageList,
			user,
			usersList,
			actions
		} = this.props

		return (
			<div className="container">
				<DevPanel
					loaded={sockets.loaded}
					connected={sockets.connected}
					message={sockets.message}
					connect={actions.socketsConnect}
					disconnect={actions.socketsDisconnect} />
				<div className="row chat-app ">
					<div className={'col-md-9 messagewindow-wrapper ' + (messageList.hidden ? 'list-showed' : '')}>
						<MessageWindow
							messages={messageList.messages}
							socketsSend={actions.socketsSend}
							toggleUsersList={actions.toggleUsersList} />
					</div>
					<div className="col-md-3 userslist-wrapper">
						<UsersList
							nicknameFormShowed={usersList.nicknameFormShowed}
							usersList={usersList.usersList}
							nickname={user.nickname}
							changeNickname={actions.changeNickname}
							showNicknameForm={actions.showNicknameForm}
							hideNicknameForm={actions.hideNicknameForm}
							toggleUsersList={actions.toggleUsersList} />
					</div>
				</div>

			</div>
		)	
	}
}

App.propTypes = {
	actions: React.PropTypes.object.isRequired,
	sockets: React.PropTypes.object.isRequired,
	messageList: React.PropTypes.object.isRequired,
	usersList: React.PropTypes.object.isRequired,
	user: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return Object.assign({}, state)
}

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)