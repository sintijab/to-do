import { LOGGED_IN, LOGGED_OUT } from "../actions/types"

const initialState = {
	payload: {},
}

export default function(state = initialState, action) {
	switch (action.type) {
		case LOGGED_IN:
			return {
				...state,
				type: action.type,
				payload: action.payload,
			}
		case LOGGED_OUT:
			return {
				...state,
				type: action.type,
			}
		default:
			return state
	}
}
