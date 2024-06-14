import authReducer from "@/pages/auth/model/auth/authSlice.ts"
import userReducer from "@/pages/home/model/user/userSlice.ts"
import userChatsReducer from "@/processes/userChats/model/userChatsSlice.ts"
import { combineReducers, configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
	authReducer,
	userReducer,
	userChatsReducer,
})
export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
