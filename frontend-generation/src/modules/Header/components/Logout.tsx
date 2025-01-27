import { ButtonHeader } from "@/components/ui/button/ButtonHeader";
import { isAuthAtom } from "@/jotai/authentication";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { handlerLogout } from "../utils/handlerLogout";

export const Logout = () => {
	const [isAuth, setIsAuth] = useAtom(isAuthAtom);
	const navigate = useNavigate();

	return (
		<>
			{isAuth && (
				<div onClick={() => handlerLogout({ setIsAuth, navigate })}>
					<ButtonHeader
						setIsAuth={setIsAuth}
						isAuth={isAuth}
						name='Выйти'
						isSvg={true}
					/>
				</div>
			)}
		</>
	);
};
