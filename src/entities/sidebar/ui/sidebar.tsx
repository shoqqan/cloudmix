import { SidebarItem } from "@/entities/sidebar/ui/sidebarItem.tsx"

export const Sidebar = () => {
	return (
		<div className={"w-[30rem] h-full flex flex-col border border-[#ccd5da] border-t-0"}>
			<div className={"h-20 py-6 px-5 flex items-center text-xl font-bold border border-b-[#ccd5da] bg-[#FBFBFB]"}>
				Messages(3)
			</div>
			<SidebarItem name={"Aslan"} lastMessage={"Hi, how is going on"} time={"10:44"} newMessages={5} />
		</div>
	)
}
