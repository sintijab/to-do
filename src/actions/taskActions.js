import { FETCH_TASKS, NEW_TASK, DELETE_TASK } from "./types"
import { requestParam } from "../common/variables"
import { xmlHttpRequest, getCookie } from "../common/utils"

export const getTasks = auth => dispatch => {
	const param = "tasks"
	const method = requestParam.getMethod
	const type = requestParam.encodedConentType
	const token = "Bearer " + auth

	xmlHttpRequest(dispatch, param, method, token, type, false, FETCH_TASKS)
}

export const createTask = (title, description) => dispatch => {
	const param = "tasks"
	const method = requestParam.postMethod
	const type = requestParam.encodedConentType
	const token = getCookie("token")
	const auth = "Bearer " + token
	const send =
		"title=" +
		encodeURIComponent(title) +
		"&description=" +
		encodeURIComponent(description)

	xmlHttpRequest(dispatch, param, method, auth, type, send, NEW_TASK)
}

export const removeTask = id => dispatch => {
	const param = "tasks/" + id
	const method = requestParam.deleteMethod
	const type = requestParam.encodedConentType
	const token = getCookie("token")
	const auth = "Bearer " + token

	xmlHttpRequest(dispatch, param, method, auth, type, false, DELETE_TASK)
}
