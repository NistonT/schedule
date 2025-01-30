import { isAuthAtom } from "@/jotai/authentication";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormRegister } from "./components/FormRegister";

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
					<FormRegister />
				</div>
			</section>
		</>
	);
};
