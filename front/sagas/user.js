import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import { 
	LOGIN_REQUEST, 
	LOGIN_SUCCESS, 
	LOGIN_FAILURE, 
	
	SIGN_IN_REQUEST, 
	SIGN_IN_SUCCESS, 
	SIGN_IN_FAILURE, 
	
	LOAD_MY_INFO_REQUEST, 
	LOAD_MY_INFO_SUCCESS, 
	LOAD_MY_INFO_FAILURE, 

	LOAD_MY_GOOGLE_INFO_REQUERST,
	LOAD_MY_GOOGLE_INFO_SUCCESS,
	LOAD_MY_GOOGLE_INFO_FAILURE,
	
	LOGOUT_REQUEST, 
	LOGOUT_SUCCESS, 
	LOGOUT_FAILURE, 

	ADD_FOLLOWING_REQUEST,
	ADD_FOLLOWING_SUCCESS,
	ADD_FOLLOWING_FAILURE,

	CREATE_CHATROOM_REQUEST,
	CREATE_CHATROOM_SUCCESS,
	CREATE_CHATROOM_FAILURE} from '../reducers/user'

import axios from 'axios'
const { frontURL } = require('../config/config')

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

function logOutAPI() {
	axios.get("/user/logout")
	axios({
		method: 'get',
		url: '/user/logout',
		baseURL: frontURL
	})
	return true
}

function* logOut() {
	try {
		yield call(logOutAPI)
		yield put({
			type: LOGOUT_SUCCESS
		})
	} catch (error) {
		yield put({
			type: LOGOUT_FAILURE
		})
	}
}

function* watchLogOut() {
	yield takeLatest(LOGOUT_REQUEST, logOut)
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

function loadMyInfoAPI() {
	return axios.get('/user/')
}

function* loadMyInfo() {
	try {
		const result = yield call(loadMyInfoAPI)
		if(result.data){
			yield put({
				type: LOAD_MY_INFO_SUCCESS,
				data: result.data
			})
		} else {
			throw('Did not logged In')
		}
	} catch (error) {
		yield put({
			type: LOAD_MY_INFO_FAILURE,
			errror: error
		})
	}
}

function* watchLoadMyInfo() {
	yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}

function loadMyGoogleInfoAPI() {
	return axios({
		method: 'get',
		url: '/user/',
		baseURL: frontURL
	})
}

function* loadMyGoogleInfo() {
	try {
		const result = yield call(loadMyGoogleInfoAPI)
		yield put({
			type: LOAD_MY_GOOGLE_INFO_SUCCESS,
			data: result.data
		})
	} catch (error) {
		yield put({
			type: LOAD_MY_GOOGLE_INFO_FAILURE,
			error: error
		})
	}
}

function* watchLoadMyGoogleInfo() {
	yield takeLatest(LOAD_MY_GOOGLE_INFO_REQUERST, loadMyGoogleInfo)
}

function addFollowingAPI(data) {
	return axios.post(`/user/follow/${data.id}`, data.list)
}

function* addFollowing(action) {
	try {
		yield call(addFollowingAPI, action.data)
		yield put({
			type: ADD_FOLLOWING_SUCCESS,
			data: action.data.list
		})
	} catch (error) {
		yield put({
			type: ADD_FOLLOWING_FAILURE,
			error: error
		})
	}
}

function* watchAddFollowing() {
	yield takeLatest(ADD_FOLLOWING_REQUEST, addFollowing)
}

function createChatRoomAPI(data) {
	return axios.post(`/user/chatroom/${data.id}`, data.list)
}

function* createChatRoom(action) {
	try {
		yield call(createChatRoomAPI, action.data)
		yield put({
			type: CREATE_CHATROOM_SUCCESS,
			data: action.data.list
		})
	} catch (error) {
		yield put({
			type: CREATE_CHATROOM_FAILURE,
			error: error
		})
	}
}

function* watchCreateChatRoom() {
	yield takeLatest(CREATE_CHATROOM_REQUEST, createChatRoom)
}

export default function* userSaga() {
	yield all([
		fork(watchLogIn),
		fork(watchLogOut),
		fork(watchSignIn),
		fork(watchLoadMyInfo),
		fork(watchLoadMyGoogleInfo),
		fork(watchAddFollowing),
		fork(watchCreateChatRoom)
	])
}