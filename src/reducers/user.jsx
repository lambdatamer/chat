import * as actionTypes from '../actionTypes'

const initialState = {
  nickname: localStorage['nickname'] || ''
}

export default function user(state = initialState, action){
  switch(action.type){
  
  case actionTypes.CHANGE_NICKNAME_SUCCESS:
    return {...state, nickname: action.payload}

  default:
    return state
  }
}