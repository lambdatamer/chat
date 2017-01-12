import { 
	CONNECTING, 
	CONNECTED, 
	DISCONNECT,
	MESSAGE_SENDING,
	MESSAGE_SENT,
	MESSAGE_RECEIVED,
	USER_CONNECTED,
	USER_DISCONNECTED } from '../actionTypes'
import io from 'socket.io-client'

export function socketsConnect(){
	return (dispatch) => {
		const socket = io.connect()

		dispatch({
			type: CONNECTING
		})

		socket.on('message', (msg) => {
			switch(msg.event){
			case 'connected':
				dispatch({
					type: CONNECTED,
					payload: socket
				})
				break
			case 'messageReceived':
				dispatch({
					type: MESSAGE_RECEIVED,
					payload: msg
				})
				break
			case 'messageSent':
				dispatch({
					type: MESSAGE_SENT,
					payload: msg
				})
				break
			case 'userConnected':
				dispatch({
					type: USER_CONNECTED,
					payload: msg
				})
				break
			case 'userDisconnected':
				dispatch({
					type: USER_DISCONNECTED,
					payload: msg
				})
				break
			default:
				console.error('Unhandled message from server')
				console.log(msg)
			}
		})
	}
}

export function socketsSend(msg){
	return (dispatch, getState) => {
		getState().sockets.socket.send(encodeURI(msg))
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