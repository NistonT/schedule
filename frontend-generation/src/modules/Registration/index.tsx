import { isAuthAtom } from "@/jotai/authentication";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
	const navigate = useNavigate();
	const isAuth = useAtomValue(isAuthAtom);
	useEffect(() => {
		if (isAuth) {
			navigate("/");
		}
	}, [isAuth, navigate]);

	return (
		<>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto flex flex-wrap items-center justify-center'>
					<div className=' bg-gray-100 rounded-lg p-8 flex flex-col w-1/3 mt-10 md:mt-0'>
						<h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
							Регистрация
						</h2>
						<div className='relative mb-4'>
							<label
								htmlFor='email'
								className='leading-7 text-sm text-gray-600'
							>
								Почта
							</label>
							<input
								type='email'
								id='email'
								name='email'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
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
								type='password'
								id='password'
								name='password'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
						<div className='relative mb-4'>
							<label
								htmlFor='confirmPassword'
								className='leading-7 text-sm text-gray-600'
							>
								Подтверждение пароля
							</label>
							<input
								type='password'
								id='confirmPassword'
								name='confirmPassword'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
						<div className='mb-4 flex items-center'>
							<input
								type='checkbox'
								id='terms'
								name='terms'
								className='mr-2 rounded focus:ring-indigo-200 text-indigo-600'
							/>
							<label htmlFor='terms' className='text-sm text-gray-600'>
								Соглашенние
							</label>
						</div>
						<button className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
							Регистрация
						</button>
						<p className='text-xs text-gray-500 mt-3'>
							У вас уже есть аккаунт?
							<span className='text-indigo-500 hover:underline ml-1 cursor-pointer'>
								Войти
							</span>
						</p>
					</div>
				</div>
			</section>
		</>
	);
};
