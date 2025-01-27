import { ButtonHeader } from "@/components/ui/button/ButtonHeader";
import { isAuthAtom } from "@/jotai/authentication";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const Login = () => {
	const [isAuth, setIsAuth] = useAtom(isAuthAtom);

	useEffect(() => {
		console.log(isAuth);
	}, [isAuth]);
	return (
		<>
			{!isAuth && (
				<ButtonHeader
					setIsAuth={setIsAuth}
					isAuth={isAuth}
					name='Войти'
					isSvg={true}
				/>
			)}
		</>
	);
};
