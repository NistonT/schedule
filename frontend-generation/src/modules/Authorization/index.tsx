import { isAuthAtom } from "@/jotai/authentication";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormAuth } from "./components/FormAuth";

export const Authorization = () => {
	const navigate = useNavigate();
	const isAuth = useAtomValue(isAuthAtom);
	useEffect(() => {
		if (isAuth) {
			navigate("/");
		}
	}, [isAuth, navigate]);

	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 300);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<section className='text-gray-600 body-font relative'>
				<div className='absolute inset-0 bg-gray-300'>
					<div className='relative min-h-screen flex'>
						<div
							className={`transition-opacity duration-1000 ${
								isVisible ? "opacity-100" : "opacity-0"
							}   w-1/2   p-8`}
						>
							<div className=' flex flex-col items-start'>
								<h1 className='text-7xl font-bold mb-4 text-left'>
									<span className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent px-2'>
										AI
									</span>
									ГЕНЕРАТОР <span className='text-blue-500'>API</span>
								</h1>
								<h2 className='text-4xl font-semibold mb-4 animate-fade-in-down text-left'>
									Создайте идеальное расписание с Генератором API
								</h2>
								<p className='text-gray-700 mb-6 animate-fade-in-up text-left text-2xl '>
									Наш инновационный сервис использует искусственный интеллект,
									чтобы создавать оптимизированные учебные расписания. Просто
									введите ваши данные, и наша система автоматически сгенерирует
									расписание, которое соответствует всем вашим требованиям и
									учитывает все детали.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='container px-5 py-24 mx-auto flex'>
					<div className='lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md'>
						<h2 className='text-gray-900 text-lg mb-4 font-medium title-font'>
							Авторизация
						</h2>
						<FormAuth />
					</div>
				</div>
			</section>
		</>
	);
};
