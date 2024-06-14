import { firestore } from "@/main.tsx"
import { showErrorToast, showWarningToast } from "@/shared/lib/toaster.ts"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { collection, endAt, getDocs, orderBy, query, startAt } from "firebase/firestore"

export const searchUsers = createAsyncThunk("userchats/search-users", async (username: string) => {
	const q = query(collection(firestore, "users"), orderBy("username"), startAt(username), endAt(username + "\uf8ff"))
	try {
		const querySnapshot = await getDocs(q)
		if (querySnapshot.empty) {
			showWarningToast("No matching users found")
			return []
		} else {
			const users = querySnapshot.docs.map((doc) => doc.data())
			return users
		}
	} catch (error) {
		showErrorToast(error.message || "An error occurred while searching for the user")
		return []
	}
})
