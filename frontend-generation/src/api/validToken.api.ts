import { ITokenAccess } from "@/type/valid-token.type";
import axios, { AxiosResponse } from "axios";

export const validTokenApi = async (
	token: string | undefined
): Promise<AxiosResponse<ITokenAccess> | null> => {
	try {
		const access = {
			access: `${token}`,
		};

		return await axios.post(
			"http://127.0.0.1:8000/auth/token/validate/",
			access,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		console.log(error);
		return null;
	}
};
