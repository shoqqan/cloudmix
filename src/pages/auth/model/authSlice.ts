import { signUp } from '@/pages/auth/model/authSliceThunk.ts'
import { createSlice } from '@reduxjs/toolkit'

interface IAuthSlice {
	isAuthenticated: boolean
	userInfo: any
}

const initialState: IAuthSlice = {
	isAuthenticated: false,
	userInfo: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.userInfo = action.payload
		})
	},
})

export default authSlice.reducer
