import { firestore } from "@/main.tsx"
import type { IUser } from "@/pages/home/model/user/types.ts"
import { showErrorToast } from "@/shared/lib/toaster.ts"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, getDoc } from "firebase/firestore"

export const getUserInfo = createAsyncThunk("user/getUserInfo", async (uid: string): Promise<IUser> => {
	try {
		const docRef = doc(firestore, "users", uid)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			const dataFromDatabase = docSnap.data()
			return {
				uid: dataFromDatabase.uid,
				email: dataFromDatabase.email,
				password: dataFromDatabase.password,
				role: dataFromDatabase.role,
				username: dataFromDatabase.username,
				createdAt: dataFromDatabase.createdAt,
				isOnline: true,
			}
		} else {
			throw Error("Not Found User")
		}
	} catch (error) {
		showErrorToast(`Error when try to get user data: ${error}`)
		throw error
	}
})
