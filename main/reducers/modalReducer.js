import { SHOW_OVERLAY, CLOSE_OVERLAY } from "../actions/types"

const initialState = {
	payload: {},
}

export default function(state = initialState, action) {
	switch (action.type) {
		case SHOW_OVERLAY:
			return {
				...state,
				type: action.type,
				payload: action.task_data,
			}
		case CLOSE_OVERLAY:
			return {
				...state,
				type: action.type,
			}
		default:
			return state
	}
}
