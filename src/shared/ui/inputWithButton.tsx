import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"

export function InputWithButton() {
	return (
		<div className="flex w-full items-center space-x-2">
			<Input type="email" placeholder="Email" />
			<Button type="submit">Send</Button>
		</div>
	)
}
