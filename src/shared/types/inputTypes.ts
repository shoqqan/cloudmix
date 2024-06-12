import type { InputHTMLAttributes } from 'react'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	id: string
	type?: string
	required?: boolean
	disabled?: boolean
}
