import { createReducer } from 'reduxsauce'
import { REHYDRATE } from 'redux-persist/constants'
import Server from 'Server'
import moment from 'moment';

const { Types } = require('../action/main');

export const INITIAL_STATE = {
	userRecord: [],
	test:false
}

export const updateUserRecord = (state = INITIAL_STATE, action) => {
	newUserRecord = state.userRecord.slice()
	newUserRecord.push(action.data)
	return { ...state, userRecord: newUserRecord, test: !state.test };
}

export const HANDLERS = {
	[Types.UPDATE_USER_RECORD]: updateUserRecord,

}

module.exports = createReducer(INITIAL_STATE, HANDLERS);