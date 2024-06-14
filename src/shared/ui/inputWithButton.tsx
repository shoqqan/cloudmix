import { Button, Input } from "@/shared/ui"

export function InputWithButton() {
	return (
		<div className="flex w-full items-center space-x-2">
			<Input type="email" placeholder="Email" />
			<Button type="submit">Send</Button>
		</div>
	)
}
