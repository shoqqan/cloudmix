import { IChatsSlice } from "@/entities/chats"
import { getUserInfo } from "@/entities/user/model/userSliceThunk.ts"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IChatsSlice = {
	chatId: "",
	user: null,
	currentUser: null,
	messages: [],
	isSelected: false,
}

const chatsSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		updateConversation(state, action) {
			if (state.currentUser && action.payload) {
				console.log("here")
				state.user = action.payload
				state.chatId =
					state.currentUser.uid > action.payload.uid
						? state.currentUser.uid + action.payload.uid
						: action.payload.uid + state.currentUser.uid
				state.isSelected = true
			}
		},
		setIsSelected(state, action) {
			state.isSelected = action.payload
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
export const { updateConversation, setMessages, setIsSelected } = chatsSlice.actions
export default chatsSlice.reducer
