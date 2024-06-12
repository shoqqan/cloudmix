import { auth, firestore } from '@/main.tsx'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

interface UserData {
	email: string
	password: string
	fullName: string
}

export const signUp = createAsyncThunk('auth/signup', async ({ email, password, fullName }: UserData) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		await setDoc(doc(firestore, 'users', user.uid), {
			uid: user.uid,
			email,
			fullName,
			createdAt: new Date(),
		})
		const idToken = await user.getIdToken()
		localStorage.setItem('idToken', idToken)
		const refreshToken = user.refreshToken
		const expiresIn = '3600'
		const localId = user.uid
		return {
			uid: user.uid,
			email,
			idToken,
			refreshToken,
			expiresIn,
			localId,
		}
	} catch (error) {
		console.log('user register error', error)
	}
})
