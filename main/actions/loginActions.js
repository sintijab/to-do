import { LOGGED_IN, LOGGED_OUT } from "./types"
import { setCookie } from "../common/utils"
import { requestParam } from "../common/variables"
import { xmlHttpRequest } from "../common/utils"

export const getLoginStatus = (username, password) => dispatch => {
	const param = "login"
	const method = requestParam.postMethod
	const type = requestParam.encodedConentType
	const send =
		"email=" +
		encodeURIComponent(username) +
		"&password=" +
		encodeURIComponent(password)
	const base64Credentials = btoa(username + ":" + password)
	xmlHttpRequest(
		dispatch,
		param,
		method,
		base64Credentials,
		type,
		send,
		LOGGED_IN,
	)
}

export const logout = () => dispatch => {
	dispatch({ type: LOGGED_OUT })
}
