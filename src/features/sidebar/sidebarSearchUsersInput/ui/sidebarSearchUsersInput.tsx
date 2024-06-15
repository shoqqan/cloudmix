import { clearSearchUsers } from "@/entities/userchats"
import { searchUsers } from "@/entities/userchats/model/sidebarSliceThunk.ts"
import { SidebarSearchItem } from "@/features/sidebar/sidebarSearchItem"
import { useAppDispatch, useAppSelector, useDebounce } from "@/shared/hooks"
import { Input } from "@/shared/ui"
import { FC, useEffect, useState } from "react"

interface SidebarSearchUsersInputProps {
	isFocused: boolean
	setIsFocused: (isFocused: boolean) => void
}

export const SidebarSearchUsersInput: FC<SidebarSearchUsersInputProps> = ({ setIsFocused, isFocused }) => {
	const [inputValue, setInputValue] = useState("")
	const dispatch = useAppDispatch()
	const { searchedUsers } = useAppSelector((state) => state.userchatsReducer)
	const debouncedInputValue = useDebounce(inputValue, 500)
	useEffect(() => {
		if (debouncedInputValue) {
			dispatch(searchUsers(debouncedInputValue))
		} else {
			dispatch(clearSearchUsers())
		}
	}, [debouncedInputValue, dispatch])

	return (
		<div
			className={`h-20 py-6 px-3 flex flex-col text-xl font-bold border-b border-b-[#ccd5da] bg-white transition-all duration-500 ${
				isFocused ? "h-full" : ""
			}`}
		>
			<Input
				onFocus={() => {
					setIsFocused(true)
				}}
				onBlur={() => {
					setIsFocused(false)
				}}
				placeholder={"Find your friend"}
				value={inputValue}
				onChange={(event) => {
					setInputValue(event.currentTarget.value)
				}}
			/>
			<div className={`transition-all duration-500 ${isFocused ? "opacity-100" : "opacity-0"}`}>
				{searchedUsers.map((user) => {
					const key = `search${user.uid}`
					return <SidebarSearchItem key={key} uid={user.uid} name={user.username} />
				})}
			</div>
		</div>
	)
}
