import { 
	CONNECTING, 
	CONNECTED, 
	DISCONNECT,
	MESSAGE_SENDING,
	MESSAGE_SENT,
	MESSAGE_RECEIVED,
	USER_CONNECTED,
	USER_DISCONNECTED,
	CHANGE_NICKNAME } from '../actionTypes'
import io from 'socket.io-client'

export function socketsConnect(){
	return (dispatch) => {
		const socket = io()
		const ls = window.localStorage

		if(!ls['nickname']){
			dispatch({
				type: CHANGE_NICKNAME
			})
			//TODO ask for a nickname
		}
		
		const authData = {
			uid: ls['uid'] || undefined,
			nickname: ls['nickname'] || undefined
		}
		
		socket.emit('auth', authData)

		dispatch({
			type: CONNECTING
		})

		socket.on('connected', (msg) => {
			ls['uid'] = msg.uid
			ls['nickname'] = msg.nickname

			dispatch({
					type: CONNECTED,
					payload: socket
				})
		})

		socket.on('messageReceived', (msg) => {
			dispatch({
				type: MESSAGE_RECEIVED,
				payload: msg
			})
		})

		socket.on('messageSent', (msg) => {
			dispatch({
				type: MESSAGE_SENT
			})
		})

		socket.on('userConnected', (msg) => {
			dispatch({
				type: USER_CONNECTED,
				payload: msg
			})
		})

		socket.on('userDisconnected', (msg) => {
			dispatch({
				type: USER_DISCONNECTED,
				payload: msg
			})
		})
	}
}

export function socketsSend(msg){
	return (dispatch, getState) => {
		getState().sockets.socket.emit('message', encodeURI(msg))
		dispatch({
			type: MESSAGE_SENDING
		})
	}
}

export function socketsDisconnect(){
	return (dispatch, getState) => {
		getState().sockets.socket.disconnect()
		dispatch({
			type: DISCONNECT
		})
	}
}