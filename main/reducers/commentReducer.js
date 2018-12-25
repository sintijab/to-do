import { GET_COMMENTS, ADD_COMMENT } from "../actions/types"

const initialState = {
	payload: {},
}

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_COMMENTS:
			return {
				...state,
				type: action.type,
				payload: action.payload,
			}
		case ADD_COMMENT:
			return {
				...state,
				type: action.type,
				payload: action.payload,
			}
		default:
			return state
	}
}
