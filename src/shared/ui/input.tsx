import * as React from "react"
import { cn } from "@/shared/lib/utils.ts"
import { Label } from "@/shared/ui/label"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, className, type = "text", ...props }, ref) => {
	const inputClassName = cn(
		"flex h-10 w-full rounded-md border border-input focus:outline-none bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 focus-visible:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50",
		className,
	)
	return label ? (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor={props.id}>{label}</Label>
			<input type={type} className={inputClassName} ref={ref} {...props} />
		</div>
	) : (
		<input type={type} className={inputClassName} ref={ref} {...props} />
	)
})

Input.displayName = "Input"

export { Input }
