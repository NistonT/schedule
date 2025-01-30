import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUserApi } from "../api/registerUser.api";
import { IRegisterFormUser } from "../type/register-form-user.type";
import { IRegisterUser } from "../type/register-user.type";

export const useRegistration = () => {
	const [sendMessage, setSendMessage] = useState<string>("");
	const [isSendMessage, setIsSendMessage] = useState<boolean>(false);

	const [sendErrorMessage, setSendErrorMessage] = useState<string>("");
	const [isSendErrorMessage, setIsSendErrorMessage] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IRegisterFormUser>();

	const { mutate } = useMutation({
		mutationKey: ["register"],
		mutationFn: (data: IRegisterUser) => registerUserApi(data),
		onSuccess: response => {
			console.log(response);
			setSendMessage("Пользователь зарегестрирован");
			setIsSendMessage(true);
			reset();
		},
		onError: error => {
			console.error(error);
		},
	});

	const onSubmit: SubmitHandler<IRegisterFormUser> = data => {
		setIsSendErrorMessage(false);
		const { confirmPassword, terms, ...result } = data;

		console.log(result);

		if (confirmPassword !== result.password) {
			console.log(confirmPassword, result.password);
			setSendErrorMessage("Пароли не совпадают");
			setIsSendErrorMessage(true);
			return;
		}

		if (terms !== true) {
			console.log(terms);
			setSendErrorMessage("Вы не подтвердили соглашение");
			setIsSendErrorMessage(true);
			return;
		}

		console.log(result);

		mutate(result);
	};

	return {
		onSubmit,
		register,
		handleSubmit,
		errors,
		sendMessage,
		isSendErrorMessage,
		isSendMessage,
		sendErrorMessage,
	};
};
