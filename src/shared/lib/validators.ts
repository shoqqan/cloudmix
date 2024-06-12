import type { FormValues } from '@/shared/types/authTypes.ts'

export const validate = ({ password, email }: FormValues) => {
	const errors: Partial<FormValues> = {}
	if (!email) {
		errors.email = 'Required'
	}
	if (!password) {
		errors.password = 'Required'
	}
	return errors
}
