import React from "react"
import { render } from "react-dom"
import { App } from "./components/app"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import rootReducer from "./reducers"

require("./styles/main.scss")

const initialState = {}
const middleware = [thunk]

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
)
export const TodoApp = () => <App />
render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
	document.getElementById("app"),
)
