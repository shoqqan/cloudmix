import type { IUser } from "@/entities/user/model/types.ts"
import { MessageArray } from "@/entities/userchats"
import { searchUsers } from "@/entities/userchats/model/sidebarSliceThunk.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface IUserChatsSlice {
	searchedUsers: IUser[]
	chats: MessageArray
}

const initialState: IUserChatsSlice = {
	searchedUsers: [],
	chats: [],
}

const userchatsSlice = createSlice({
	name: "userchats",
	initialState,
	reducers: {
		clearSearchUsers(state) {
			state.searchedUsers = []
		},
		setChats(state, action) {
			state.chats = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(searchUsers.fulfilled, (state, action: PayloadAction<any[]>) => {
			state.searchedUsers = action.payload
		})
	},
})

export const { clearSearchUsers, setChats } = userchatsSlice.actions

export default userchatsSlice.reducer
