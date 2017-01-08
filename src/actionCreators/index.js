import { 
	CONNECTING, 
	CONNECTED, 
	DISCONNECT,
	MESSAGE_SENDING,
	MESSAGE_SENT,
	MESSAGE_RECEIVED } from '../actionTypes'
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
			default:
				console.error('Unhandled message from server')
				console.log(msg)
			}
		})
	}
}

export function socketsSend(msg){
	return (dispatch) => {
		dispatch({
			type: MESSAGE_SENDING,
			payload: msg
		})
	}
}

export function socketsDisconnect(){
	return {
		type: DISCONNECT
	}
}