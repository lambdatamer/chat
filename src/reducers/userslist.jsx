import * as actionTypes from '../actionTypes'

const initialState = {
	usersList: [],
	nicknameFormShowed: false
}

export default function usersList(state = initialState, action){
	switch(action.type){

	case actionTypes.CONNECTED:
		return {...state, usersList: action.payload.usersList}

	case actionTypes.USER_CONNECTED:
		return {...state, usersList: state.usersList.concat({
			uid: [action.payload.uid],
			nickname: action.payload.nickname
		})}

	case actionTypes.USER_DISCONNECTED:
		return {...state, usersList: state.usersList.filter(
			(elem) => {
				return elem.uid != action.payload.uid ? true : false
			})
		}

	case actionTypes.SHOW_NICKNAME_FORM:
		return {...state, nicknameFormShowed: true}

	case actionTypes.HIDE_NICKNAME_FORM:
		return {...state, nicknameFormShowed: false}

	case actionTypes.USER_CHANGED_NICKNAME:
		return {...state, 
			usersList: state.usersList.map((elem) => {
				if(elem.uid == action.payload.uid){
					return {
						uid: elem.uid,
						nickname: action.payload.nickname
					}
				}else{
					return elem
				}
			})
		}

	default:
		return state

	}
}