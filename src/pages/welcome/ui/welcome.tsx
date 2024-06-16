import smartphone from "@/shared/assets/images/smartphone.jpg"
import { Logo } from "@/shared/ui"
import { ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"

export const Welcome = () => {
	return (
		<main className="flex overflow-hidden h-screen flex-col p-2 lg:justify-evenly">
			<div className="flex justify-center shrink-0 items-center rounded-lg bg-white p-4 h-52 lg:h-20 lg:justify-center">
				<Logo />
			</div>
			<div className="mt-4 flex w-full justify-center h-80 gap-4 flex-row lg:flex-col lg:h-full">
				<div className="flex items-center justify-evenly h-full gap-6 rounded-lg bg-gray-50 w-3/5 px-20 lg:flex-col lg:w-full">
					<div className={"flex flex-col gap-5 lg:justify-center"}>
						<p className={`text-gray-800 text-3xl leading-normal`}>
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
					<img src={smartphone} className={"w-32 lg:w-52"} alt="logo" />
				</div>
			</div>
		</main>
	)
}

export default Welcome
