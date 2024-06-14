import { auth, firestore } from "@/main.tsx"
import { IUser, ROLES } from "@/pages/home/model/types.ts"
import { getUserInfo } from "@/pages/home/model/user/userSliceThunk.ts"
import { showErrorToast } from "@/shared/lib/toaster.ts"
import { createAsyncThunk } from "@reduxjs/toolkit"
import {
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	setPersistence,
	signInWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

interface UserData {
	email: string
	password: string
	username: string
}

export const signUp = createAsyncThunk(
	"auth/signup",
	async ({ email, password, username }: UserData): Promise<IUser> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			const userData = {
				uid: user.uid,
				email: user.email!,
				username: username,
				password: password,
				role: ROLES.USER,
				isOnline: true,
				createdAt: new Date().toISOString(),
			}
			await setDoc(doc(firestore, "users", user.uid), userData)
			return userData
		} catch (error) {
			showErrorToast(error.message)
			throw error
		}
	},
)

export const signIn = createAsyncThunk(
	"auth/signin",
	async ({ email, password }: Pick<UserData, "email" | "password">, { dispatch }) => {
		try {
			setPersistence(auth, browserSessionPersistence)
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			dispatch(getUserInfo(user.uid))
			return user.uid
		} catch (error) {
			showErrorToast(error.message)
			throw error
		}
	},
)
