import { chatsReducer } from "@/entities/chats"
import { userReducer } from "@/entities/user"
import { userchatsReducer } from "@/entities/userchats"
import authReducer from "@/pages/auth/model/auth/authSlice.ts"
import { persistConfig } from "@/shared/config"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"

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
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
	})
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
