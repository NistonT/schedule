import axios, { AxiosResponse } from "axios";
import { IUpdatedUser } from "../type/updated-user.type";

export const updatedUserApi = async (
	id: number,
	data: Record<string, string>
): Promise<AxiosResponse<IUpdatedUser> | null> => {
	try {
		return await axios.put(
			`http://127.0.0.1:8000/auth/user/update/${id}/`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		console.error(error);
		return null;
	}
};
