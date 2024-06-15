import { Button, Input } from "@/shared/ui"
import clsx from "clsx"
import { FC } from "react"

interface ISearchInput {
	inputValue: string
	setInputValue: (value: string) => void
	setIsFocused: (isFocused: boolean) => void
	isFocused: boolean
}

export const SearchInput: FC<ISearchInput> = ({ inputValue, setInputValue, setIsFocused, isFocused }) => (
	<div className="flex gap-x-1">
		<Input
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			placeholder="Find your friend"
			value={inputValue}
			onChange={(event) => setInputValue(event.currentTarget.value)}
		/>
		<Button
			onClick={() => setIsFocused(false)}
			className={clsx("bg-purple-800 transition-all hidden lg:block", {
				"lg:w-20 lg:opacity-100 lg:visible": isFocused,
				"lg:w-0 lg:opacity-0 lg:invisible": !isFocused,
			})}
		>
			Cancel
		</Button>
	</div>
)
