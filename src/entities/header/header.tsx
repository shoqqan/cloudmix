import { Logo } from "@/entities/logo/Logo.tsx"
import { useAppSelector } from "@/shared/lib/redux.ts"

export const Header = () => {
	const store = useAppSelector((state) => state.authReducer)
	console.log(store)
	return (
		<header className={"w-full h-32 py-2 px-10 bg-amber-200 flex justify-between"}>
			<Logo />
		</header>
	)
}
