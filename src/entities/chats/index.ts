export { default as chatsReducer } from "./model/chatsSlice.ts"
export { setUser, updateConversation, setMessages, setIsSelected } from "./model/chatsSlice.ts"
export { getMessagesFromGPT } from "./model/chatsSliceThunk.ts"
export { type IMessage, type IChatsSlice } from "./model/types.ts"
