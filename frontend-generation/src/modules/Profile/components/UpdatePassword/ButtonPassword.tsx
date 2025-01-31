import { IUser } from "@/type/user.type";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { changePasswordApi } from "../../api/changePassword.api";
import { IChangePasswordForm } from "../../type/change-password-form.type";
import { IChangePassword } from "../../type/change-password.type";
type Props = {
	user: IUser | null;
};

export const ButtonPassword = ({ user }: Props) => {
	const [isModal, setIsModal] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IChangePasswordForm>();

	const handlerIsModal = () => {
		setIsModal(!isModal);
		reset();
	};

	const { mutate } = useMutation({
		mutationKey: ["updatePassword"],
		mutationFn: (data: IChangePassword) => changePasswordApi(user!.id, data),
	});

	const onSubmit: SubmitHandler<IChangePasswordForm> = data => {
		const { old_password, new_password, confirm_password } = data;

		mutate({ old_password, new_password });
	};

	return (
		<>
			<button
				className='text-lg leading-6 font-medium text-gray-900 hover:underline'
				type='button'
				onClick={handlerIsModal}
			>
				Изменить пароль
			</button>
			{isModal && (
				<div className='fixed flex items-center justify-center inset-0 bg-opacity-75 backdrop-blur-sm bg-transparent'>
					<div className='bg-white p-8 rounded shadow-lg w-96'>
						<h2 className='text-xl font-semibold mb-4'>Изменение пароля</h2>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='mb-4'>
								<label
									htmlFor='oldPassword'
									className='block text-sm font-medium text-gray-700'
								>
									Старый пароль
								</label>
								<input
									{...register("old_password", { required: true })}
									type='password'
									id='oldPassword'
									className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
							<div className='mb-4'>
								<label
									htmlFor='newPassword'
									className='block text-sm font-medium text-gray-700'
								>
									Новый пароль
								</label>
								<input
									{...register("new_password", { required: true })}
									type='password'
									id='newPassword'
									className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
							<div className='mb-4'>
								<label
									htmlFor='newPassword'
									className='block text-sm font-medium text-gray-700'
								>
									Подтвердите пароль
								</label>
								<input
									{...register("confirm_password", { required: true })}
									type='password'
									id='newPassword'
									className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
							<div className='flex justify-between'>
								<button
									onClick={handlerIsModal}
									type='button'
									className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									Отмена
								</button>
								<button
									type='submit'
									className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									Сохранить
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
