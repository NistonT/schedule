import { ITokenUser } from "@/type/auto-token.type";
import { IAutoUser } from "@/type/auto-user.type";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const AutoUserApi = async (
	data: IAutoUser
): Promise<AxiosResponse<ITokenUser> | null> => {
	try {
		const response = await axios.post<ITokenUser>(
			`http://127.0.0.1:8000/auth/login/`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		Cookies.set("token", response.data.access, {
			path: "/",
			expires: 1,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});
		Cookies.set("token_refresh", response.data.refresh, {
			path: "/",
			expires: 7,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});
		return response;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(`Axios error: ${error.message}`);
			console.error(`Status code: ${error.response?.status}`);
			console.error(`Response data: ${JSON.stringify(error.response?.data)}`);
		} else {
			console.error(`Unexpected error: ${error}`);
		}
		return null;
	}
};
