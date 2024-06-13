import logo from "@/assets/images/logo.svg"
import React from "react"

export const Logo = () => {
	return (
		<div className={"flex justify-center items-center gap-1.5"}>
			<img src={logo} alt="Logo" className={"w-16 h-16"} />
			<h3 className={"font-bold text-2xl"}>
				Cloud<span className={"text-[#9969FF]"}>Mix</span>
			</h3>
		</div>
	)
}
