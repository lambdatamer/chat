import { MESSAGE_RECEIVED, MESSAGE_SENT } from '../actionTypes'

const initialState = {
	messages: []
}

export default function messageList(state = initialState, action) {
	switch(action.type){
	case MESSAGE_SENT:
	return state
	case MESSAGE_RECEIVED:
	return {...state,
		messages: state.messages.concat(action.payload)
	}
	default: 
	return state
	}
}