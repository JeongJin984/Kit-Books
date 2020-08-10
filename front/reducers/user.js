import produce from 'immer'

const initialState = {
	nickName: '',
	email:'',
	isLoggedIn: false,
	me: {
		name: "",
		chatRooms: []
	}
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const LOAD_MY_GOOGLE_INFO_REQUERST = 'LOAD_MY_GOOGLE_INFO_FAILURE'
export const LOAD_MY_GOOGLE_INFO_SUCCESS = 'LOAD_MY_GOOGLE_INFO_SUCCESS'
export const LOAD_MY_GOOGLE_INFO_FAILURE = 'LOAD_MY_GOOGLE_INFO_FAILURE'

export const SIGN_IN_REQUEST = 'SIGNIN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGNIN_FAILURE'

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const ADD_FOLLOWING_REQUEST = 'ADD_FOLLOWING_REQUEST'
export const ADD_FOLLOWING_SUCCESS = 'ADD_FOLLOWING_SUCCESS'
export const ADD_FOLLOWING_FAILURE = 'ADD_FOLLOWING_FAILURE'

export const CREATE_CHATROOM_REQUEST = 'CREATE_CHATROOM_REQUEST'
export const CREATE_CHATROOM_SUCCESS = 'CREATE_CHATROOM_SUCCESS'
export const CREATE_CHATROOM_FAILURE = 'CREATE_CHATROOM_FAILURE'

const userReducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case LOGIN_SUCCESS :
				draft.isLoggedIn = true,
				draft.me = action.data
				break
	
			case SIGN_IN_SUCCESS :
				draft.isLoggedIn = true
				break
	
			case LOAD_MY_GOOGLE_INFO_SUCCESS :
				draft.isLoggedIn = action.data ? true : false
				draft.me = action.data
				break

			case LOAD_MY_INFO_SUCCESS : 
				draft.isLoggedIn = true
				draft.me = action.data ? action.data : initialState.me
				break

			case LOGOUT_SUCCESS :
				draft.isLoggedIn = false,
				draft.me = initialState.me
				break

			case ADD_FOLLOWING_SUCCESS :
				action.data.map(v => draft.me.Followings.push(v))
				break
				
			case CREATE_CHATROOM_SUCCESS : 

				break;
			default:
				break
		}
	})
}

export default userReducer