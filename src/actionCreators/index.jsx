import io from 'socket.io-client'

import * as actionTypes from '../actionTypes'

export function socketsConnect(){
	return (dispatch) => {
		const socket = io()

		const signInData = {
			uid: localStorage['uid'] || undefined,
			nickname: localStorage['nickname'] || undefined
		}
		
		socket.emit('signIn', signInData)

		dispatch({
			type: actionTypes.CONNECTING
		})
		applySocketCallbacks(socket, dispatch)
	}
}

export function socketsSend(msg){
	return (dispatch, getState) => {
		getState().sockets.socket.emit('message', encodeURI(msg))
		dispatch({
			type: actionTypes.MESSAGE_SENDING
		})
	}
}

export function socketsDisconnect(){
	return (dispatch, getState) => {
		getState().sockets.socket.disconnect()
		dispatch({
			type: actionTypes.DISCONNECT
		})
	}
}

function applySocketCallbacks(socket, dispatch){

	socket.on('connected', (msg) => {
		localStorage['uid'] = msg.uid
		localStorage['nickname'] = msg.nickname

		dispatch({
			type: actionTypes.CONNECTED,
			payload: {
				socket: socket,
				usersList: msg.usersList || [],
				messages: msg.messages
			}
		})
	})

	socket.on('messageReceived', (msg) => {
		dispatch({
			type: actionTypes.MESSAGE_RECEIVED,
			payload: msg
		})
	})

	socket.on('messageSent', () => {
		dispatch({
			type: actionTypes.MESSAGE_SENT
		})
	})

	socket.on('userConnected', (msg) => {
		dispatch({
			type: actionTypes.USER_CONNECTED,
			payload: msg
		})
	})

	socket.on('userDisconnected', (msg) => {
		dispatch({
			type: actionTypes.USER_DISCONNECTED,
			payload: msg
		})
	})

	socket.on('nicknameChangeSuccess', (msg) => {
		localStorage['nickname'] = msg.nickname
		dispatch({
			type: actionTypes.CHANGE_NICKNAME_SUCCESS,
			payload: msg.nickname
		})
	})

	socket.on('userChangedNickname', (msg) => {
		dispatch({
			type: actionTypes.USER_CHANGED_NICKNAME,
			payload: msg
		})
	})
}

export function changeNickname(newNick){
	return (dispatch, getState) =>{
		dispatch({
			type: actionTypes.CHANGE_NICKNAME_REQUEST
		})
		getState().sockets.socket.emit('nicknameChange', { 
			nickname: newNick.length > 32 ? newNick.slice(0,31) : newNick
		})
	}
}

export function showNicknameForm(){
	return {
		type: actionTypes.SHOW_NICKNAME_FORM
	}
}

export function hideNicknameForm(){
	return {
		type: actionTypes.HIDE_NICKNAME_FORM
	}
}

export function toggleUsersList(){
	return {
		type: actionTypes.TOGGLE_USERS_LIST
	}
}