/* prettier-ignore-file */

/* eslint-disable */

import * as Yup from 'yup'

export const authSchema = Yup.object().shape({

	email: Yup.string().email('Invalid email address').required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters long')
		.required('Password is required'),
})

export const registerSchema = Yup.object().shape({
	fullName: Yup.string().required('Full name is required'),
	email: Yup.string().email('Invalid email address').required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters long')
		.required('Password is required'),
	secondPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Confirm password is required'),
})
