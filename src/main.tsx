import { firebaseConfig } from "@/shared/config"
import { initializeFirebase, initializeStore } from "@/shared/lib/utils.ts"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import App from "./app"

export const { app, auth, firestore } = initializeFirebase(firebaseConfig)
export const { store, persistor } = initializeStore()
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<HashRouter>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</HashRouter>
	</Provider>,
)
