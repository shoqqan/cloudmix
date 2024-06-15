import { chatsReducer } from "@/entities/chats"
import { userReducer } from "@/entities/user"
import { userchatsReducer } from "@/entities/userchats"
import authReducer from "@/pages/auth/model/auth/authSlice.ts"
import { persistConfig } from "@/shared/config"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"

const rootReducer = combineReducers({
	authReducer,
	userReducer,
	userchatsReducer,
	chatsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
	return configureStore({
		reducer: persistedReducer,
	})
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
