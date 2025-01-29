import axios, { AxiosResponse } from "axios";
import { INewKey } from "../type/new-key.type";

export const reloadKeyApi = async (
	user_id: number
): Promise<AxiosResponse<INewKey> | null> => {
	try {
		return await axios.post(
			`http://127.0.0.1:8000/auth/user/update-api-key/`,
			{
				user_id,
			},
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
