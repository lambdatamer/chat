import * as actionTypes from '../actionTypes'

const initialState = {
	messages: []
}

export default function messageList(state = initialState, action) {
	switch(action.type){

	case actionTypes.MESSAGE_RECEIVED:
		return {...state,
			messages: state.messages.concat({
				type: 'message',
				name: action.payload.name,
				text: action.payload.text,
				time: action.payload.time
			})
		}
	default: 
		return state
	}
}