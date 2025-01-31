import axios from "axios";
import { IChangePassword } from "../type/change-password.type";

export const changePasswordApi = async (id: number, data: IChangePassword) => {
	try {
		return await axios.post(
			`http://127.0.0.1:8000/auth/user/change-password/${id}/`,
			data,
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
