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

const chatReducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case LOAD_CHATS_SUCCESS:
				draft.myRoom = action.data
				draft.curRoomId = action.id
				break;
			case POST_CHATS_SUCCESS:
				draft.myRoom.push(action.data)
				break;
			default:
				break;
		}
	})
}

export default chatReducer