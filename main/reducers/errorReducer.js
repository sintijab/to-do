import { CLIENT_FAILED, REQUEST_FAILED } from "../actions/types"

const initialState = {
	payload: {},
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CLIENT_FAILED:
			return {
				...state,
				type: action.type,
				payload: action.payload,
			}
		case REQUEST_FAILED:
			return {
				...state,
				type: action.type,
				payload: action.payload,
			}
		default:
			return state
	}
}
