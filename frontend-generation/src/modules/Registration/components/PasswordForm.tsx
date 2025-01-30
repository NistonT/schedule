import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { IRegisterFormUser } from "../type/register-form-user.type";
import { PasswordIsSee } from "./PasswordIsSee";

type Props = {
	register: UseFormRegister<IRegisterFormUser>;
	errors: string | undefined;
};

export const PasswordForm = ({ register, errors }: Props) => {
	const [isSee, setIsSee] = useState<boolean>(false);

	const handlerIsSeePassword = () => {
		setIsSee(!isSee);
	};

	return (
		<div className='relative mb-4'>
			<label htmlFor='password' className='leading-7 text-sm text-gray-600'>
				Пароль
			</label>
			<input
				{...register("password", {
					required: true,
					minLength: {
						value: 6,
						message: `Имя пользователя должно содержать не менее ${6} символов`,
					},
					maxLength: {
						value: 255,
						message: `Имя пользователя должно содержать не более ${255} символов`,
					},
					pattern: {
						value: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/,
						message:
							"Пароль должен содержать хотя бы одну букву в нижнем регистре и хотя бы одну букву в верхнем регистре. Допускаются только латинские буквы и цифры",
					},
				})}
				type={`${isSee ? "text" : "password"}`}
				id='password'
				className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
			/>
			<button
				className='absolute right-1 top-1/2'
				type='button'
				onClick={event => {
					event.preventDefault();
					handlerIsSeePassword();
				}}
			>
				<PasswordIsSee isSee={isSee} />
			</button>
			{errors && <p className='text-red-500 text-xs mt-1'>{errors}</p>}
		</div>
	);
};
