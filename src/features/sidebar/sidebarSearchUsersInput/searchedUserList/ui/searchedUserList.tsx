import { IUser } from "@/entities/user"
import { SidebarSearchItem } from "@/features/sidebar/sidebarSearchItem"
import { FC } from "react"

interface ISearchedUserList {
	users: IUser[]
	isFocused: boolean
}

export const SearchedUsersList: FC<ISearchedUserList> = ({ users, isFocused }) => (
	<div className={`transition-all duration-500 ${isFocused ? "opacity-100" : "opacity-0"}`}>
		{users.map((user) => (
			<SidebarSearchItem key={`search${user.uid}`} uid={user.uid} name={user.username} />
		))}
	</div>
)
