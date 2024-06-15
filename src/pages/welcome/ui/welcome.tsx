import { Logo } from "@/shared/ui"
import { ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"

export const Welcome = () => {
	return (
		<main className="flex min-h-screen flex-col p-6">
			<div className="flex h-20 shrink-0 items-end rounded-lg bg-white p-4 md:h-52">
				<Logo />
			</div>
			<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
				<div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
					<img src="src/shared/assets/images/logo.svg" width={50} alt="logo" />
					<p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
						<strong>
							Welcome to Cloud<span className={"text-purple-500"}>Mix</span>.
						</strong>
					</p>
					<Link
						to="/login"
						className="flex items-center gap-5 self-start rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-500 md:text-base"
					>
						<span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
					</Link>
				</div>
			</div>
		</main>
	)
}

export default Welcome
