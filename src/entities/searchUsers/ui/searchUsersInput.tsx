import { clearSearchUsers } from "@/processes/userChats/model/userChatsSlice.ts"
import { searchUsers } from "@/processes/userChats/model/userChatsSliceThunk.ts"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts"
import { useAppSelector } from "@/shared/hooks/useAppSelector.ts"
import { useDebounce } from "@/shared/hooks/useDebounce.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { useEffect, useState } from "react"

export const SearchUsersInput = () => {
	const [inputValue, setInputValue] = useState("")
	const dispatch = useAppDispatch()
	const { searchedUsers } = useAppSelector((state) => state.userChatsReducer)
	const debouncedInputValue = useDebounce(inputValue, 500)
	console.log(searchedUsers)
	useEffect(() => {
		if (debouncedInputValue) {
			dispatch(searchUsers(debouncedInputValue))
		} else {
			dispatch(clearSearchUsers())
		}
	}, [debouncedInputValue, dispatch])

	return (
		<div className={"h-20 py-6 px-3 flex items-center text-xl font-bold border-b border-b-[#ccd5da]  bg-white"}>
			<Input
				placeholder={"Find your friend"}
				value={inputValue}
				onChange={(event) => {
					setInputValue(event.currentTarget.value)
				}}
			/>
		</div>
	)
}
