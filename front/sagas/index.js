import { all, fork } from 'redux-saga/effects'

import userSaga from './user'

import axios from 'axios'
const { backURL } = require('../config/config')

axios.defaults.baseURL = backURL
axios.defaults.withCredentials = true

export default function* rootSaga() {
	yield all([
		fork(userSaga)
	])
}