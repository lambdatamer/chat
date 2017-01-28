import {
	CONNECTED,
	USER_CONNECTED,
	USER_DISCONNECTED
} from '../actionTypes'

const initialState = {
	usersList: []
}

export default function usersList(state = initialState, action){
	switch(action.type){

	case CONNECTED:
		return {...state, usersList: action.payload.usersList}

	case USER_CONNECTED:

		const newUser = {
			uid: [action.payload.uid],
			nickname: action.payload.nickname
		}

		return {...state, usersList: state.usersList.concat(newUser)}

	case USER_DISCONNECTED:
		const disconnectedUid = action.payload.uid

		const newUsersList = state.usersList.filter((elem) => {
			return elem.uid != disconnectedUid ? true : false
		})

		return {...state, usersList: newUsersList}

	default:
		return state
	}
}