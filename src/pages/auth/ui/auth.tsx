import { Input } from '@/components/ui/input'
import { signUp } from '@/pages/auth/model/authSliceThunk.ts'
import { validate } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux.ts'
import { AUTH } from '@/shared/types/authTypes.ts'
import { useFormik } from 'formik'
import type { FC } from 'react'

interface IAuthProps {
	type: AUTH
}

export const Auth: FC<IAuthProps> = ({ type }) => {
	const dispatch = useAppDispatch()
	const authStore = useAppSelector((state) => state.authReducer)
	const formik = useFormik({
		initialValues: {
			email: 'shoqqan',
			password: '777',
		},
		validate,
		onSubmit: async ({ email, password }) => {
			console.log(email, password)
			dispatch(signUp({ email, password, fullName: 'Shoqan Tataev' }))
		},
	})
	console.log(authStore)
	return (
		<article className='w-screen h-screen flex flex-col gap-y-5 justify-center items-center'>
			<h1 className='text-2xl font-bold'>{type === AUTH.LOGIN ? 'Sign-in :3' : 'Sign-up <3'}</h1>
			<form className='w-80 flex flex-col gap-y-5 border p-4 rounded-2xl' onSubmit={formik.handleSubmit}>
				<label htmlFor='email'>Email</label>
				<Input
					name='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					id='email'
					placeholder='johndoe@zimran.com'
					type='email'
				/>

				<label htmlFor='password'>Password</label>
				<Input
					className={`px-2 py-2 border rounded-lg transition-all ${
						formik.touched && formik.errors.password && 'border-red-500'
					}`}
					name='password'
					onChange={formik.handleChange}
					id='password'
					placeholder='*********'
					type='password'
					value={formik.values.password}
				/>
				{/*{type === AUTH.REGISTER && (*/}
				{/*	<>*/}
				{/*		<label htmlFor='second_password'>Confirm Password</label>*/}
				{/*		<input*/}
				{/*			className={`px-2 py-2 border rounded-lg transition-all ${*/}
				{/*				formik.touched && formik.errors.password && 'border-red-500'*/}
				{/*			}`}*/}
				{/*			name='second_password'*/}
				{/*			onChange={formik.handleChange}*/}
				{/*			id='second_password'*/}
				{/*			placeholder='*********'*/}
				{/*			type='password'*/}
				{/*		/>*/}
				{/*	</>*/}
				{/*)}*/}
				<button
					disabled={formik.touched && !formik.isValid}
					className='px-4 py-2 text-amber-50 bg-[#2383e2] shadow-lg rounded-xl transition-all hover:bg-[#0077d4]'
					type='submit'
				>
					Login
				</button>
				<div className='w-full flex justify-between text-sm underline hover:text-[#2383e2]'>
					<button onClick={() => console.log('redirect')}>
						{type === AUTH.REGISTER ? "Don't have an account?" : 'Already have an account?'}
					</button>
				</div>
			</form>
		</article>
	)
}
