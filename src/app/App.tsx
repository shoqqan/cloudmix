import { AppRouters } from "@/app/routers"
import { Toaster } from "react-hot-toast"

import "./index.css"

function App() {
	return (
		<div className={"overflow-hidden font-inter"}>
			<AppRouters />
			<Toaster />
		</div>
	)
}

export { App }
