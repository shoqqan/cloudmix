import { IUser } from "@/entities/user"

export interface IMessage {
	date: number
	id: string
	senderId: string
	text: string
}

export interface IChatsSlice {
	chatId: string
	user: IUser | null
	currentUser: IUser | null
	messages: IMessage[]
	isSelected: boolean
	isGPTLoading: boolean
}
