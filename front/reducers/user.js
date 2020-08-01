const initialState = {
	nickName: '',
	email:'',

	isLoggedIn: false,
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const GOOGLE_LOGIN_REQUEST = 'GOOGLE_LOGIN_REQUEST'
export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS'
export const GOOGLE_LOGIN_FAILURE = 'GOOGLE_LOGIN_FAILURE'

export const SIGN_IN_REQUEST = 'SIGNIN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGNIN_FAILURE'

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS :
			return {
				...state,
				isLoggedIn: true,
				me: action.data
			}

			case SIGN_IN_SUCCESS :
				return {
					...state,
					isLoggedIn: true
				}

			case GOOGLE_LOGIN_SUCCESS :
				return {
					...state,
					isLoggedIn: true
				}

			case LOAD_MY_INFO_SUCCESS : {
				return {
					...state,
					isLoggedIn: true,
					me: action.data
				}
			}
		default:
			return state;
	}
}

export default userReducer