import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	chatId: "",
	user: {},
}

const chatsSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		updateConversation(state, action) {
			state.user = action.payload
		},
	},
})

export default chatsSlice.reducer
