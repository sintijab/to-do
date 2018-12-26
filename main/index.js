import React from "react"
import { render } from "react-dom"
import { App } from "./app"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

require("./common/styles/main.scss")

const initialState = {}
const middleware = [thunk]

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__(),
	),
)

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app"),
)
