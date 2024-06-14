import { setupStore } from "@/app/store.ts"
import { firebaseConfig } from "@/shared/config/config.ts"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./app"

export const app = initializeApp(firebaseConfig)
const store = setupStore()
export const auth = getAuth(app)
export const firestore = getFirestore(app)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
)
