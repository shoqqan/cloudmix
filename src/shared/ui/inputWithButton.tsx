import { Button, Input } from "@/shared/ui"

interface IInputWithButtonProps {
	disabled: boolean
	setText: (text: string) => void
	text: string
	onSubmit: () => void
}

export function InputWithButton({ disabled, setText, onSubmit, text }: IInputWithButtonProps) {
	return (
		<div className="flex w-full items-center space-x-2">
			<Input
				type="email"
				onChange={(event) => {
					setText(event.target.value)
				}}
				value={text}
				placeholder="Email"
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
