import { validTokenApi } from "@/api/validToken.api";
import Cookies from "js-cookie";

type Props = {
	setIsAuth: any;
};

export const isToken = async ({ setIsAuth }: Props) => {
	const response = await validTokenApi(Cookies.get("token"));
	if (response?.status === 200) {
		setIsAuth(true);
	}
};
