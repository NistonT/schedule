import { isAuthAtom } from "@/jotai/authentication";
import { IAutoUser } from "@/type/auto-user.type";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AutoUserApi } from "./api/auto-user.api";

export const Authorization = () => {
	const navigate = useNavigate();
	const [isAuth, setIsAuth] = useAtom(isAuthAtom);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IAutoUser>();

	useEffect(() => {
		if (isAuth) {
			navigate("/");
		}
	}, []);
	useEffect(() => {
		if (isAuth) {
			navigate("/");
		}
	}, [isAuth]);

	const onSubmit: SubmitHandler<IAutoUser> = data => {
		AutoUserApi(data)
			.then(response => {
				console.log(response);
				setIsAuth(true);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<>
			<section className='text-gray-600 body-font relative'>
				<div className='absolute inset-0 bg-gray-300'></div>
				<div className='container px-5 py-24 mx-auto flex'>
					<div className='lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md'>
						<h2 className='text-gray-900 text-lg mb-4 font-medium title-font'>
							Авторизация
						</h2>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='relative mb-4'>
								<label
									htmlFor='username'
									className='leading-7 text-sm text-gray-600'
								>
									Имя пользователя
								</label>
								<input
									{...register("username", { required: true })}
									type='text'
									id='username'
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									required
								/>
							</div>
							<div className='relative mb-4'>
								<label
									htmlFor='password'
									className='leading-7 text-sm text-gray-600'
								>
									Пароль
								</label>
								<input
									{...register("password", { required: true })}
									type='password'
									id='password'
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									required
								/>
							</div>
							<button
								type='submit'
								className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
							>
								Войти
							</button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};
