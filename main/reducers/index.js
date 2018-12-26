import { combineReducers } from "redux"
import loginReducer from "./loginReducer"
import taskReducer from "./taskReducer"
import errorReducer from "./errorReducer"
import modalReducer from "./modalReducer"
import commentReducer from "./commentReducer"

const appReducer = combineReducers({
	loginStatus: loginReducer,
	tasks: taskReducer,
	error: errorReducer,
	modal: modalReducer,
	comments: commentReducer,
})

export default (state, action) => {
	const initialState = appReducer({}, {})
	switch (action.type) {
		default:
			state = initialState
	}
	return appReducer(state, action)
}
