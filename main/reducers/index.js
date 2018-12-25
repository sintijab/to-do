import { combineReducers } from "redux"
import loginReducer from "./loginReducer"
import taskReducer from "./taskReducer"
import errorReducer from "./errorReducer"
import modalReducer from "./modalReducer"
import commentReducer from "./commentReducer"

export default combineReducers({
	loginStatus: loginReducer,
	tasks: taskReducer,
	error: errorReducer,
	modal: modalReducer,
	comments: commentReducer,
})
