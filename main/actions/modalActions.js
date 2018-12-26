import { SHOW_OVERLAY, CLOSE_OVERLAY, GET_COMMENTS, ADD_COMMENT } from "./types"
import { requestParam } from "../common/variables"
import { xmlHttpRequest, getCookie } from "../common/utils"

export const addComment = (id, text) => dispatch => {
	const param = "tasks/" + id + "/comments"
	const method = requestParam.postMethod
	const type = requestParam.encodedConentType
	const auth = getCookie("token")
	const token = "Bearer " + auth
	const send = "text=" + encodeURIComponent(text)
	xmlHttpRequest(dispatch, param, method, token, type, send, ADD_COMMENT)
}

export const getComments = id => dispatch => {
	const param = "tasks/" + id + "/comments"
	const method = requestParam.getMethod
	const type = requestParam.encodedConentType
	const auth = getCookie("token")
	const token = "Bearer " + auth

	xmlHttpRequest(dispatch, param, method, token, type, false, GET_COMMENTS)
}

export const showOverlay = (title, description, id) => dispatch => {
	let data = {
		title: title,
		text: description,
		id: id,
	}
	dispatch({ type: SHOW_OVERLAY, task_data: data })
}

export const closeOverlay = () => dispatch => {
	dispatch({ type: CLOSE_OVERLAY })
}
