import { firestore } from "@/main.tsx"
import { toasters } from "@/shared/lib"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { collection, endAt, getDocs, orderBy, query, startAt } from "firebase/firestore"

export const searchUsers = createAsyncThunk("userchats/search-users", async (username: string) => {
	const q = query(collection(firestore, "users"), orderBy("username"), startAt(username), endAt(username + "\uf8ff"))
	try {
		const querySnapshot = await getDocs(q)
		if (querySnapshot.empty) {
			toasters.showWarningToast("No matching users found")
			return []
		} else {
			const users = querySnapshot.docs.map((doc) => doc.data())
			console.log(users)
			return users
		}
	} catch (error) {
		toasters.showErrorToast(error.message || "An error occurred while searching for the user")
		return []
	}
})
