import { 
	MESSAGE_RECEIVED, 
	MESSAGE_SENT,
	USER_CONNECTED,
	USER_DISCONNECTED } from '../actionTypes'

const initialState = {
	messages: []
}

export default function messageList(state = initialState, action) {
	switch(action.type){

	case MESSAGE_SENT:
		return {...state,
			messages: state.messages.concat({
				type: 'userMessage',
				name: action.payload.name,
				text: action.payload.text,
				time: action.payload.time
			})
		}
		break

	case MESSAGE_RECEIVED:
		return {...state,
			messages: state.messages.concat({
				type: 'message',
				name: action.payload.name,
				text: action.payload.text,
				time: action.payload.time
			})
		}

		break

	case USER_CONNECTED:
		return state

		break

	case USER_DISCONNECTED:
		return state

		break

	default: 
		return state
	}
}