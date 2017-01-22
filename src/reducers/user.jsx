import {
	CHANGE_NICKNAME
} from '../actionTypes'

const initialState = {
	nickname: window.localStorage['nickname'] || ''
}

export default function user(state = initialState, action){
	switch(action.type){
	default:
		return state
	}
}