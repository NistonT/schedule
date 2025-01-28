import { isAuthAtom } from "@/jotai/authentication";
import { IAutoUser } from "@/type/auto-user.type";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutoUserApi } from "../api/auto-user.api";

export const useAuthorization = () => {
	const [messageError, setMessageError] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);

	const setIsAuth = useSetAtom(isAuthAtom);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IAutoUser>();

	const { mutate } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IAutoUser) => AutoUserApi(data),
		onSuccess: response => {
			if (response === null) {
				console.log("Ошибка авторизации");
				setMessageError("Пользователь не найден");
				setIsError(true);
				return;
			}
			console.log("Успешный ответ:", response);
			setIsAuth(true);
		},
		onError: error => {
			console.error("Ошибка:", error);
			setMessageError(error.message);
			setIsError(true);
		},
	});

	const onSubmit: SubmitHandler<IAutoUser> = data => {
		mutate(data);
		reset();
	};

	return {
		onSubmit,
		register,
		handleSubmit,
		messageError,
		isError,
		errors,
	};
};
