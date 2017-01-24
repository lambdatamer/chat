import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import sockets from './sockets'
import messageList from './messagelist'
import user from './user'
import userList from './userlist'

export default combineReducers({
	sockets, messageList, user, userList
})