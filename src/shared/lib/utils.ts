import { setupStore } from "@/app/store.ts"
import { type ClassValue, clsx } from "clsx"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { persistStore } from "redux-persist"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const convertTimestampToTime = (timestamp: number): string => {
	const date = new Date(timestamp * 1000) // Умножаем на 1000, чтобы получить миллисекунды
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const formattedHours = hours.toString().padStart(2, "0")
	const formattedMinutes = minutes.toString().padStart(2, "0")
	return `${formattedHours}:${formattedMinutes}`
}

export const initializeFirebase = (config) => {
	const app = initializeApp(config)
	const auth = getAuth(app)
	const firestore = getFirestore(app)
	return { app, auth, firestore }
}

export const initializeStore = () => {
	const store = setupStore()
	const persistor = persistStore(store)
	return { store, persistor }
}
