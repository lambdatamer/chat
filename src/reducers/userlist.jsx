import {
	CONNECTED,
	USER_CONNECTED,
	USER_DISCONNECTED
} from '../actionTypes'

const initialState = {
	userList: undefined
}

export default function userList(state = initialState, action){
	switch(action.type){

	case CONNECTED:
		return {...state, userList: action.payload.userList}
	case USER_CONNECTED:

		const newUser = {
			[action.payload.uid]: action.payload.nickname
		}

		return {...state, userList: Object.assign({}, state.userList, newUser)}

	case USER_DISCONNECTED:

		const newUserList = Object.assign({}, state.userList)

		delete newUserList[action.payload.uid]

		return {...state, userList: newUserList}

	default:
		return state
	}
}