import { chatsReducer } from "@/entities/chats"
import { userReducer } from "@/entities/user"
import { userchatsReducer } from "@/entities/userchats"
import authReducer from "@/pages/auth/model/auth/authSlice.ts"
import { combineReducers, configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
	authReducer,
	userReducer,
	userchatsReducer,
	chatsReducer,
})
export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
