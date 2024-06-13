import { auth, firestore } from '@/main.tsx'
import type { IUserInfo } from '@/pages/auth/model/types.ts'
import { showErrorToast } from '@/shared/lib/toaster.ts'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

interface UserData {
	email: string
	password: string
	fullName: string
}

export const signUp = createAsyncThunk(
	'auth/signup',
	async ({ email, password, fullName }: UserData): Promise<IUserInfo> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			const user = userCredential.user
			const userData = {
				uid: user.uid,
				email: user.email!,
				fullName: fullName,
				createdAt: new Date().toISOString(),
			}
			await setDoc(doc(firestore, 'users', user.uid), userData)
			const idToken = await user.getIdToken()
			localStorage.setItem('idToken', idToken)
			return userData
		} catch (error) {
			showErrorToast(error.message)
			throw error
		}
	},
)

export const signIn = createAsyncThunk(
	'auth/signin',
	async ({ email, password }: Pick<UserData, 'email' | 'password'>): Promise<IUserInfo> => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			const user = userCredential.user

			const userData = {
				uid: user.uid,
				email: user.email!,
				fullName: user.displayName!,
				createdAt: new Date().toISOString(),
			}
			const idToken = await user.getIdToken()
			console.log(user)
			localStorage.setItem('idToken', idToken)
			return userData
		} catch (error) {
			showErrorToast(error.message)
			throw error
		}
	},
)
