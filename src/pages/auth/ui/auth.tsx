/* eslint-disable */
import { signIn, signUp } from "@/pages/auth/model/auth/authSliceThunk.ts"
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux.ts"
import { authSchema, registerSchema } from "@/shared/lib/validators.ts"
import { AUTH } from "@/shared/types/authTypes.ts"
import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { useFormik } from "formik"
import type { FC } from "react"
import { Link } from "react-router-dom"

interface IAuthProps {
	type: AUTH
}

export const Auth: FC<IAuthProps> = ({ type }) => {
	const authStore = useAppSelector((state) => state.authReducer)
	const dispatch = useAppDispatch()
	const formik = useFormik({
		initialValues: {
			type,
			fullName: "",
			email: "shoqqan@gmail.com",
			password: "777",
			secondPassword: "",
		},
		validationSchema: type === AUTH.LOGIN ? authSchema : registerSchema,
		onSubmit: async ({ email, password, fullName }) => {
			if (type === AUTH.REGISTER) {
				dispatch(signUp({ email, password, username: fullName }))
			} else {
				dispatch(signIn({ email, password }))
			}
		},
	})
	return (
		<article className="w-screen h-screen flex flex-col gap-y-5 justify-center items-center">
			<h1 className="text-2xl font-bold">{type === AUTH.LOGIN ? "Sign-in :3" : "Sign-up <3"}</h1>
			<form className="w-80 flex flex-col gap-y-5 border p-4 rounded-2xl" onSubmit={formik.handleSubmit}>
				{type === AUTH.REGISTER && (
					<>
						<Input
							label={"Full Name"}
							className={`px-2 py-2 border rounded-lg transition-all ${
								formik.touched.fullName && formik.errors.fullName && "border-red-500"
							}`}
							name="fullName"
							value={formik.values.fullName}
							onChange={formik.handleChange}
							id="fullName"
							placeholder="John Doe"
							type="text"
						/>
						{formik.errors.fullName && <p className={"text-red-500"}>{formik.errors.fullName}</p>}
					</>
				)}
				<Input
					label={"Email"}
					className={`px-2 py-2 border rounded-lg transition-all ${
						formik.touched.email && formik.errors.email && "border-red-500"
					}`}
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					id="email"
					placeholder="johndoe@zimran.com"
					type="email"
				/>
				{formik.errors.email && <p className={"text-red-500"}>{formik.errors.email}</p>}

				<Input
					label={"Password"}
					className={`px-2 py-2 border rounded-lg transition-all ${
						formik.touched.password && formik.errors.password && "border-red-500"
					}`}
					name="password"
					onChange={formik.handleChange}
					id="password"
					placeholder="*********"
					type="password"
					value={formik.values.password}
				/>
				{formik.errors.password && <p className={"text-red-500"}>{formik.errors.password}</p>}

				{type === AUTH.REGISTER && (
					<>
						<Input
							label={"Confirm Password"}
							className={`px-2 py-2 border rounded-lg transition-all ${
								formik.touched.secondPassword && formik.errors.secondPassword && "border-red-500"
							}`}
							name="secondPassword"
							onChange={formik.handleChange}
							id="secondPassword"
							placeholder="*********"
							type="password"
							value={formik.values.secondPassword}
						/>
						{formik.errors.secondPassword && <p className={"text-red-500"}>{formik.errors.secondPassword}</p>}
					</>
				)}
				<Button
					disabled={formik.touched && !formik.isValid && authStore.isLoading}
					className="bg-[#2383e2] hover:bg-[#0077d4]"
					type={"submit"}
				>
					{type === AUTH.REGISTER ? "Sign Up" : "Login"}
				</Button>
				<Button variant={"link"} type={"button"} asChild>
					<Link to={type === AUTH.REGISTER ? "/login" : "/registration"}>
						{type === AUTH.REGISTER ? "Already have an account?" : "Don't have an account?"}
					</Link>
				</Button>
			</form>
		</article>
	)
}
