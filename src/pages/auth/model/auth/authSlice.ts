import { getUserInfo } from "@/entities/user/model/userSliceThunk.ts"
import { signIn, signUp } from "@/pages/auth/model/auth/authSliceThunk.ts"
import type { IAuthSlice } from "@/pages/auth/model/auth/types.ts"
import { toasters } from "@/shared/lib"
import { createSlice } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

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
				toasters.showToast("Successefully registered")
			})
			.addCase(signIn.pending, (state) => {
				state.isLoading = true
			})
			.addCase(signIn.rejected, (state) => {
				state.isLoading = false
			})
			.addCase(getUserInfo.fulfilled, (state) => {
				toasters.showToast("Successefully Logged In")
				state.isLoading = false
			})
			.addCase(PURGE, () => {
				return initialState
			})
	},
})

export default authSlice.reducer
