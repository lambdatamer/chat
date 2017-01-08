import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import sockets from './sockets'
import messageList from './messagelist'

export default combineReducers({
	sockets, messageList
})