import { useAuth } from "@/processes/providers/authProvider"
import { useAppSelector } from "@/shared/hooks"
import { Button, Logo } from "@/shared/ui"

export const Header = () => {
	const { logout } = useAuth()
	const { userInfo } = useAppSelector((state) => state.userReducer)
	return (
		<header className={"w-full h-32 py-2 px-10 flex justify-between items-center"}>
			<Logo />
			{userInfo && (
				<div className={"flex flex-col items-end text-[#180A29]"}>
					<h2 className={"text-2xl font-bold"}>{userInfo.username}</h2>
					<Button
						className={"text-lg text-[#8b8594] font-medium  p-0"}
						variant={"link"}
						onClick={() => {
							logout()
						}}
					>
						Logout
					</Button>
				</div>
			)}
		</header>
	)
}
