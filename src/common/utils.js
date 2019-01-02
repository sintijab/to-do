import { requestParam } from "./variables"
import {
	LOGGED_IN,
	FETCH_TASKS,
	CLIENT_FAILED,
	REQUEST_FAILED,
	GET_COMMENTS,
} from "../actions/types"

export const isEmpty = key => {
	return Object.keys(key).length === 0 || key.length === 0
}

export const setCookie = (name, value, days) => {
	let expires = days ? days * 86400 : 86400
	document.cookie =
		name + "=" + (value || "") + "; max-age=" + expires + "; path=/"
}

export const getCookie = name => {
	if (document.cookie.length > 0) {
		let valueStarts = document.cookie.indexOf(name + "=")
		if (valueStarts !== -1) {
			valueStarts = valueStarts + name.length + 1
			let valueEnds = document.cookie.indexOf(";", valueStarts)
			if (valueEnds === -1) {
				valueEnds = document.cookie.length
			}
			return unescape(document.cookie.substring(valueStarts, valueEnds))
		}
	}
	return null
}

const extractTasks = jsonResponse => {
	let tasks = jsonResponse.data
		.map(items => items.data)
		.filter(data => data.type === "tasks")
	return tasks
}

const extractComments = jsonResponse => {
	let tasks = jsonResponse.data
		.map(items => items.data)
		.filter(data => data.type === "comments")
	return tasks
}

export const xmlHttpRequest = (
	dispatch,
	param,
	method,
	auth,
	contentType,
	sendData,
	resolved,
) => {
	let xmlhttp = new XMLHttpRequest()
	let requestUrl = requestParam.requestUrl + param
	xmlhttp.onreadystatechange = function() {
		if (this.readyState === 4) {
			let data = this.responseText
			let jsonResponse = !!data && data.length > 0 ? JSON.parse(data) : null
			if (this.status === 200 || this.status === 201) {
				resolved === LOGGED_IN ? (data = jsonResponse.token) : jsonResponse
				resolved === FETCH_TASKS
					? (data = extractTasks(jsonResponse))
					: jsonResponse
				resolved === GET_COMMENTS
					? (data = extractComments(jsonResponse))
					: jsonResponse
				dispatch({ type: resolved, payload: data })
			} else if (this.status > 201 && this.status < 500) {
				dispatch({ type: CLIENT_FAILED, payload: jsonResponse })
			} else {
				dispatch({ type: REQUEST_FAILED, payload: jsonResponse })
			}
		}
	}
	xmlhttp.open(method, requestUrl, true)

	xmlhttp.setRequestHeader("Content-Type", contentType)
	xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
	xmlhttp.setRequestHeader("Authorization", auth)

	sendData ? xmlhttp.send(sendData) : xmlhttp.send()
}
