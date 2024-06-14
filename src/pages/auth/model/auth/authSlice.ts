import { signIn, signUp } from "@/pages/auth/model/auth/authSliceThunk.ts"
import type { IAuthSlice } from "@/pages/auth/model/auth/types.ts"
import { getUserInfo } from "@/pages/home/model/user/userSliceThunk.ts"
import { showToast } from "@/shared/lib/toaster.ts"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IAuthSlice = {
	isLoading: false,
	isAuthenticated: false,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signUp.fulfilled, () => {
				showToast("Successefully registered")
			})
			.addCase(signIn.pending, (state) => {
				state.isLoading = true
			})
			.addCase(signIn.rejected, (state) => {
				state.isLoading = false
			})
			.addCase(getUserInfo.fulfilled, (state) => {
				showToast("Successefully Logged In")
				state.isLoading = false
			})
	},
})

export default authSlice.reducer
