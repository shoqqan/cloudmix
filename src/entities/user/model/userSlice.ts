import type { IUserSlice } from "@/entities/user/model/types.ts"
import { getUserInfo } from "@/entities/user/model/userSliceThunk.ts"
import { showErrorToast } from "@/shared/lib/toaster.ts"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IUserSlice = {
	userInfo: null,
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			state.userInfo = action.payload
		})
		builder.addCase(getUserInfo.rejected, () => {
			showErrorToast("Error gettin user")
		})
	},
})

export default userSlice.reducer
