import { clearSearchUsers } from "@/entities/userchats"
import { searchUsers } from "@/entities/userchats/model/sidebarSliceThunk.ts"
import { SearchedUsersList } from "@/features/sidebar/sidebarSearchUsersInput/searchedUserList/ui/searchedUserList.tsx"
import { SearchInput } from "@/features/sidebar/sidebarSearchUsersInput/searchInput"
import { useAppDispatch, useAppSelector, useDebounce } from "@/shared/hooks"
import clsx from "clsx"
import { FC, useEffect, useState } from "react"

interface ISidebarSearchUsersInputProps {
	isFocused: boolean
	setIsFocused: (isFocused: boolean) => void
}

export const SidebarSearchUsersInput: FC<ISidebarSearchUsersInputProps> = ({ setIsFocused, isFocused }) => {
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
			className={clsx(
				"h-20 py-6 px-3 flex flex-col text-xl font-bold border-b border-b-[#ccd5da] bg-white transition-all duration-500",
				{
					"h-full": isFocused,
				},
			)}
		>
			<SearchInput
				inputValue={inputValue}
				setInputValue={setInputValue}
				setIsFocused={setIsFocused}
				isFocused={isFocused}
			/>
			<SearchedUsersList users={searchedUsers} isFocused={isFocused} />
		</div>
	)
}
