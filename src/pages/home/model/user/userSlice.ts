import { IUserSlice } from "@/pages/home/model/types.ts"
import { getUserInfo } from "@/pages/home/model/user/userSliceThunk.ts"
import { showErrorToast } from "@/shared/lib/toaster.ts"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IUserSlice = {
	userInfo: null,
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserInfo() {},
	},
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
