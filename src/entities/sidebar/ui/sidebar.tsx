import { SearchUsersInput } from "@/entities/searchUsers/ui/searchUsersInput.tsx"
import { SidebarItem } from "@/entities/sidebar/ui/sidebarItem.tsx"
import { useAppSelector } from "@/shared/hooks/useAppSelector.ts"

export const Sidebar = () => {
	const { searchedUsers } = useAppSelector((state) => state.userChatsReducer)

	return (
		<div className={"w-[30rem] h-full flex flex-col border-r border-r-[#ccd5da]"}>
			<SearchUsersInput />
			{searchedUsers &&
				searchedUsers.map((user) => {
					const key = `search${user.uid}`
					return (
						<SidebarItem key={key} uid={user.uid} name={user.username} lastMessage={""} time={""} newMessages={0} />
					)
				})}
		</div>
	)
}
