import { CustomJwtPayload } from "@/type/types";
import { IUser } from "@/type/user.type";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

export const getUserIdApi = async (
	token: string | undefined
): Promise<AxiosResponse<IUser> | null> => {
	if (!token) {
		return null;
	}
	try {
		const decodedToken = jwtDecode<CustomJwtPayload>(token);
		if (!decodedToken.user_id) {
			console.error("Не найден id");
			return null;
		}
		return await axios.get(
			`http://127.0.0.1:8000/auth/user/profile/?user_id=${decodedToken.user_id}`
		);
	} catch (error) {
		console.error(error);
		return null;
	}
};
