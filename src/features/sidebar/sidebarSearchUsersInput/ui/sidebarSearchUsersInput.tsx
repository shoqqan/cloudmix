import { searchUsers } from "@/entities/userchats/model/sidebarSliceThunk.ts"
import { clearSearchUsers } from "@/entities/userchats/model/userchatsSlice.ts"
import { useAppDispatch, useAppSelector, useDebounce } from "@/shared/hooks"
import { Input } from "@/shared/ui"
import { useEffect, useState } from "react"

export const SidebarSearchUsersInput = () => {
	const [inputValue, setInputValue] = useState("")
	const dispatch = useAppDispatch()
	const { searchedUsers } = useAppSelector((state) => state.userchatsReducer)
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
