import type { FC } from "react"

interface ISidebarItemProps {
	uid: string
	name: string
}

export const SidebarSearchItem: FC<ISidebarItemProps> = ({ uid, name }) => {
	return <div className={""}>{name}</div>
}
