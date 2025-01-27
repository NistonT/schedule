import { SetStateAction } from "jotai";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";

type Options = {
	setIsAuth: (args_0: SetStateAction<boolean>) => void;
	navigate: NavigateFunction;
};

export const handlerLogout = ({ setIsAuth, navigate }: Options) => {
	Cookies.remove("token");
	Cookies.remove("token_refresh");
	setIsAuth(false);
	navigate("/authorization");
};
