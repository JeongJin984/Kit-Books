import produce from 'immer'

const initialState = {
	curRoomId: -10,
	myRoom: [
	]
}

export const LOAD_CHATS_REQUEST = "LOAD_CHATS_REQUEST"
export const LOAD_CHATS_SUCCESS = "LOAD_CHATS_SUCCESS"
export const LOAD_CHATS_FAILURE = "LOAD_CHATS_FAILURE"

export const POST_CHATS_REQUEST = "POST_CHATS_REQUEST"
export const POST_CHATS_SUCCESS = "POST_CHATS_SUCCESS"
export const POST_CHATS_FAILURE = "POST_CHATS_FAILURE"

export const USER_ENTER = "USER_ENTER"

const chatReducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case LOAD_CHATS_SUCCESS:
				draft.myRoom = action.data
				draft.curRoomId = action.id
				break;

			case POST_CHATS_SUCCESS:
				break;

			case USER_ENTER: 
				draft.myRoom.push({
					sender: action.data.sender,
					receiver: "a",
					message: action.data.message,
					chatRoomId: draft.curRoomId
				})
				break;
			default:
				break;
		}
	})
}

export default chatReducer