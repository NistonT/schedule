import { IUser } from "@/type/user.type";
import axios, { AxiosResponse } from "axios";
import { IRegisterUser } from "../type/register-user.type";

export const registerUserApi = async (
	data: IRegisterUser
): Promise<AxiosResponse<IUser> | null> => {
	try {
		return await axios.post("http://127.0.0.1:8000/auth/register/", data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.log(error);
		return null;
	}
};
