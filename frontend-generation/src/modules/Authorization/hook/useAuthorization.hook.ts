import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import { isAuthAtom } from "../../../jotai/auth.jotai";
import { IAuthorization } from "../../../type/authorization.type";
import { auth } from "../constants";

export const useAuthorization = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IAuthorization>();

	const [isAuth, setIsAuth] = useAtom(isAuthAtom);

	const onSubmit: SubmitHandler<IAuthorization> = data => {
		if (auth.password === data.password && auth.login === data.login) {
			setIsAuth(true);
		} else {
			console.log(data);
		}
	};

	return {
		register,
		handleSubmit,
		errors,
		reset,
		onSubmit,
		isAuth,
		setIsAuth,
	};
};
