import { Button, Input } from "@/shared/ui"

interface IInputWithButtonProps {
	disabled: boolean
	setText: (text: string) => void
	text: string
	onSubmit: () => void
	placeholder: string
}

export function InputWithButton({ placeholder, disabled, setText, onSubmit, text }: IInputWithButtonProps) {
	return (
		<div className="flex w-full items-center space-x-2 h-1/6">
			<Input
				type="text"
				onChange={(event) => {
					setText(event.target.value)
				}}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						onSubmit()
					}
				}}
				value={text}
				placeholder={placeholder}
			/>
			<Button
				type="button"
				onClick={() => {
					onSubmit()
				}}
				disabled={disabled}
			>
				Send
			</Button>
		</div>
	)
}
