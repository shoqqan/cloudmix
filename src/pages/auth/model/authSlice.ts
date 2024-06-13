import { signIn, signUp } from '@/pages/auth/model/authSliceThunk.ts'
import type { IAuthSlice } from '@/pages/auth/model/types.ts'
import { showToast } from '@/shared/lib/toaster.ts'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IAuthSlice = {
	isLoading: false,
	isAuthenticated: false,
	userInfo: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signUp.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.isAuthenticated = true
				state.userInfo = action.payload
				state.isLoading = false
				showToast('Successefully registered')
			})
			.addCase(signUp.rejected, (state, action) => {
				state.isLoading = false
			})

			.addCase(signIn.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.isAuthenticated = true
				state.userInfo = action.payload
				state.isLoading = false
				showToast('Successefully authenthificated')
			})
			.addCase(signIn.rejected, (state, action) => {
				state.isLoading = false
			})
	},
})

export default authSlice.reducer
