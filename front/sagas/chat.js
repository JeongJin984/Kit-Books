import axios from 'axios'

import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import { 
	LOAD_CHATS_REQUEST, 
	LOAD_CHATS_SUCCESS, 
	LOAD_CHATS_FAILURE, 
	POST_CHATS_REQUEST,
	POST_CHATS_SUCCESS,
	POST_CHATS_FAILURE
} from "../reducers/chat";

function loadChatAPI(data) {
	return axios.get(`/chat/${data}`)
} 

function* loadChat(action) {
	try {
		const result = yield call(loadChatAPI, action.data)
		yield put({
			type: LOAD_CHATS_SUCCESS,
			data: result.data,
			id: action.data
		})
	} catch (error) {
		yield put({
			type: LOAD_CHATS_FAILURE,
			error: error
		})
	}
}

function* watchLoadChat() {
	yield takeLatest(LOAD_CHATS_REQUEST, loadChat)
}

function postChatAPI(data) {
	return axios.post('/chat/', data)
}

function* postChat(action) {
	try {
		yield call(postChatAPI, action.data)
		yield put({
			type: POST_CHATS_SUCCESS,
			data: action.data
		})
	} catch (error) {
		yield put({
			type: POST_CHATS_FAILURE,
			error: error
		})
	}
}

function* watchPostChat(){
	yield takeLatest(POST_CHATS_REQUEST, postChat)
}

export default function* chattingSaga() {
	yield all([
		fork(watchLoadChat),
		fork(watchPostChat)
	])	
}