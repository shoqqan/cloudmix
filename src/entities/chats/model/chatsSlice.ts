import { getMessagesFromGPT, IChatsSlice, IMessage } from "@/entities/chats"
import { sendMessageToGPT } from "@/entities/chats/model/chatsSliceThunk.ts"
import { getUserInfo } from "@/entities/user/model/userSliceThunk.ts"
import { toasters } from "@/shared/lib"
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"

const initialState: IChatsSlice = {
	chatId: "",
	user: null,
	currentUser: null,
	messages: [],
	isSelected: false,
	isGPTLoading: false,
}

const chatsSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		updateConversation(state, action) {
			if (state.currentUser && action.payload) {
				state.user = action.payload
				if (action.payload.uid === "chatgptid") {
					console.log("here")
					state.chatId = "chatgptid"
				} else {
					state.chatId =
						state.currentUser.uid > action.payload.uid
							? state.currentUser.uid + action.payload.uid
							: action.payload.uid + state.currentUser.uid
				}
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
		builder
			.addCase(getUserInfo.fulfilled, (state, action) => {
				state.currentUser = action.payload
			})
			.addCase(getMessagesFromGPT.pending, (state) => {
				state.isGPTLoading = true
			})
			.addCase(getMessagesFromGPT.fulfilled, (state, action) => {
				state.isGPTLoading = false
				state.messages = action.payload
			})
			.addCase(getMessagesFromGPT.rejected, (state) => {
				state.isGPTLoading = false
			})
			.addCase(sendMessageToGPT.pending, () => {
				toasters.showToast("CloudGPT is thinking...")
			})
			.addCase(sendMessageToGPT.fulfilled, (state, action) => {
				const newMessage: IMessage = {
					id: uuid(),
					text: action.payload.content,
					senderId: "chatgpt",
					date: Date.now(),
				}
				state.messages.push(newMessage)
			})
	},
})
export const { updateConversation, setMessages, setIsSelected } = chatsSlice.actions
export default chatsSlice.reducer
