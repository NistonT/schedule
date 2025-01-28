import { isAuthAtom } from "@/jotai/authentication";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
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

	return (
		<>
			<section className='text-gray-600 body-font relative'>
				<div className='absolute inset-0 bg-gray-300'></div>
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
