import type { IUser } from "@/pages/home/model/user/types.ts"
import { searchUsers } from "@/processes/userChats/model/userChatsSliceThunk.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface IUserChatsSlice {
	searchedUsers: IUser[]
}

const initialState: IUserChatsSlice = {
	searchedUsers: [],
}

const userChatsSlice = createSlice({
	name: "userchats",
	initialState,
	reducers: {
		clearSearchUsers(state) {
			state.searchedUsers = []
		},
	},
	extraReducers: (builder) => {
		builder.addCase(searchUsers.fulfilled, (state, action: PayloadAction<any[]>) => {
			state.searchedUsers = action.payload
		})
	},
})

export const { clearSearchUsers } = userChatsSlice.actions

export default userChatsSlice.reducer
