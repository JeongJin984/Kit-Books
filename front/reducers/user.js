const initialState = {
	nickName: '',
	email:'',

	isLoggedIn: false,
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS :
			return {
				...state,
				isLoggedIn: true
			}
		default:
			return state;
	}
}

export default userReducer