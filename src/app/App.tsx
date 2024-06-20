import { AppRouters } from "@/app/routers"
import { Toaster } from "react-hot-toast"

import "./index.css"
import { useEffect } from "react"
import { useAppSelector } from "@/shared/hooks"
import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "@/main.tsx"
import { changeOnlineStatus } from "@/features/chat"

function App() {
	return (
		<div className={"overflow-hidden font-inter"}>
			<AppRouters />
			<Toaster />
		</div>
	)
}

export { App }
