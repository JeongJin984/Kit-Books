import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../reducers/user'

import axios from 'axios'

function logInAPI(data) {
	return axios.get('/user/login', data)
}

function* logIn(action) {
	try {
		yield call(logInAPI, action.data)
		yield put({
			type: LOGIN_SUCCESS,
		})
	} catch (error) {
		yield put({
			type: LOGIN_FAILURE,
			error: error
		})
	}
}

function* watchLogIn() {
	yield takeLatest(LOGIN_REQUEST, logIn)
}

export default function* userSaga() {
	yield all([
		fork(watchLogIn)
	])
}