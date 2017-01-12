import { 
	CONNECTING,
	CONNECTED,
	MESSAGE_SENDING,
	MESSAGE_SENT,
	DISCONNECT } from '../actionTypes'

const initialState = {
	loaded: true,
	connected: false,
	message: 'init',
}

export default function sockets(state = initialState, action) {
	switch(action.type){
	case CONNECTING:
		return {...state, 
			loaded: true,
			connected: false,
			message: 'Connecting...'
		}
	case CONNECTED:
		return {...state, 
			loaded: true,
			connected: true,
			message: 'Connected.',
			socket: action.payload
		}
	case MESSAGE_SENDING:
		return {...state,
			message: 'Message sending...'
		}
	case MESSAGE_SENT:
		return {...state,
			message: 'Message sent.'
		}
	case DISCONNECT:
		return {...state, 
			loaded: true,
			connected: false,
			message: 'Disconnected.',
			socket: undefined
		}
	default:
		return state
	}
}