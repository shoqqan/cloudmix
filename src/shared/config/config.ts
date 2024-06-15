import storage from "redux-persist/lib/storage"

export const firebaseConfig = {
	apiKey: "AIzaSyAUiZeXuH8R8ms93aqUiNkes6I2OKasGR0",
	authDomain: "messenger-6119d.firebaseapp.com",
	projectId: "messenger-6119d",
	storageBucket: "messenger-6119d.appspot.com",
	messagingSenderId: "979459921266",
	appId: "1:979459921266:web:4e6e9b8385d00b8915b9eb",
	measurementId: "G-MYEFR6PEPS",
}

export const persistConfig = {
	key: "root",
	storage,
}
