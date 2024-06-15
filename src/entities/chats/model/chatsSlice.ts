import { getUserInfo } from "@/entities/user/model/userSliceThunk.ts"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	chatId: "",
	user: {},
	currentUser: {},
	messages: [],
}

const chatsSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		updateConversation(state, action) {
			state.user = action.payload
			console.log("currentUser: ", state.currentUser.uid)
			console.log("user: ", action.payload.uid)
			state.chatId =
				state.currentUser.uid > action.payload.uid
					? state.currentUser.uid + action.payload.uid
					: action.payload.uid + state.currentUser.uid
			console.log(state.chatId)
		},
		setMessages(state, action) {
			state.messages = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			state.currentUser = action.payload
		})
	},
})
export const { updateConversation, setMessages } = chatsSlice.actions
export default chatsSlice.reducer
