import { 
	CONNECTING, 
	CONNECTED,
	MESSAGE_SENDING, 
	DISCONNECT } from '../actionTypes'

const initialState = {
	loaded: false,
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
		state.socket.send(encodeURI(action.payload))
		return {...state,
			message: 'Message sending...'
		}
	case DISCONNECT:
		state.socket.disconnect()
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