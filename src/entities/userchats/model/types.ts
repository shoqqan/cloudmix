interface UserInfo {
	uid: string
	username: string
}

interface LastMessage {
	text: string
}

interface MessageData {
	date: string
	lastMessage: LastMessage
	userInfo: UserInfo
}

export type MessageArray = [string, MessageData][]
