import { all, fork } from 'redux-saga/effects'

import userSaga from './user'

import axios from 'axios'

axios.defaults.baseURL="http://localhost:3090"
axios.defaults.withCredentials = true

export default function* rootSaga() {
	yield all([
		fork(userSaga)
	])
}