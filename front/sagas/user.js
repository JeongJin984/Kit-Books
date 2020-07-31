import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAILURE } from '../reducers/user'

import axios from 'axios'

function logInAPI(data) {
	return axios.post('/user/login', data)
}

function* logIn(action) {
	try {
		const result = yield call(logInAPI, action.data)
		yield put({
			type: LOGIN_SUCCESS,
			data: result.data
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

function signInAPI(data) {
	return axios.post('/user/signin', data)
}

function* signIn(action) {
	try {
		yield call(signInAPI, action.data)
		yield put({
			type: SIGN_IN_SUCCESS,
		})
	} catch (error) {
		yield put({
			type: SIGN_IN_FAILURE,
			error: error.response.error
		})
	}
}

function* watchSignIn() {
	yield takeLatest(SIGN_IN_REQUEST, signIn)
}

function googleLogInAPI() {
 return axios.get('/google')
}

function* googleLogIn() {
	try {
		const result = yield call(googleLogInAPI)
		yield put({
			type: GOOGLE_LOGIN_SUCCESS,
			data: result.data
		})
	} catch (error) {
		yield put({
			type: GOOGLE_LOGIN_FAILURE,
			error: error
		})
	}
}

function* watchGoogleLogIn() {
	yield takeLatest(GOOGLE_LOGIN_REQUEST, googleLogIn)
}

export default function* userSaga() {
	yield all([
		fork(watchLogIn),
		fork(watchSignIn),
		fork(watchGoogleLogIn)
	])
}