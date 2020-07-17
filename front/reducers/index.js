import {  HYDRATE } from 'next-redux-wrapper'
import{ combineReducers } from 'redux'

import user from './user'

const reducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			// Attention! This will overwrite client state! Real apps should use proper reconciliation.
			return {...state, ...action.payload}
		default: {
			const combineReducer = combineReducers({
				user,
			})
			return combineReducer(state, action)
		}
	}
};

export default reducer