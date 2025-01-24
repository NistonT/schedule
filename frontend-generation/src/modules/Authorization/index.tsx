import { useEffect } from "react";
import { InputForm } from "./components/InputForm";
import { useAuthorization } from "./hook/useAuthorization.hook";

export const Authorization = () => {
	const { register, handleSubmit, reset, onSubmit, isAuth } =
		useAuthorization();

	useEffect(() => {
		if (isAuth) {
			console.log(isAuth);
			reset();
		}
	}, [isAuth]);

	return (
		<section className='text-gray-600 body-font'>
			<div className='container px-5 py-24 mx-auto flex flex-wrap items-center relative'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className=' bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-1/3 mx-auto mt-10 md:mt-0'
				>
					<h2 className='text-gray-900 text-lg font-medium title-font mb-5 mx-auto'>
						Авторизация
					</h2>

					<InputForm
						type={"text"}
						name={"login"}
						register={register}
						label={"Логин"}
					/>

					<InputForm
						type={"password"}
						name={"password"}
						register={register}
						label={"Пароль"}
					/>

					<button className='text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg'>
						Войти
					</button>
				</form>
			</div>
		</section>
	);
};
