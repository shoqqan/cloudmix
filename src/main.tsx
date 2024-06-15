import { setupStore } from "@/app/store.ts"
import { firebaseConfig } from "@/shared/config"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

import App from "./app"

export const app = initializeApp(firebaseConfig)
const store = setupStore()
export const auth = getAuth(app)
export const firestore = getFirestore(app)
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</BrowserRouter>
	</Provider>,
)
