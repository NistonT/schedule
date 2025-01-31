import { getUserIdApi } from "@/api/getUserId.api";
import { isAuthAtom } from "@/jotai/authentication";
import { IUser } from "@/type/user.type";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormatDate } from "./components/FormatDate";
import { IdUser } from "./components/IdUser";
import { KeyApi } from "./components/KeyApi";
import { InputUpdate } from "./components/updatedUser/inputUpdate";
import { ButtonPassword } from "./components/UpdatePassword/buttonPassword";
import { EUpdateUser } from "./type/update-user.type";

export const Profile = () => {
	const [user, setUser] = useState<IUser | null>(null);

	const navigate = useNavigate();

	const isAuth = useAtomValue(isAuthAtom);

	useEffect(() => {
		if (!isAuth) {
			navigate("/authorization");
		}
	}, [isAuth]);

	const { mutate } = useMutation({
		mutationKey: ["getUser"],
		mutationFn: (token: string | undefined) => getUserIdApi(token),
		onSuccess: response => {
			if (response && response.data) {
				setUser(response.data as IUser);
			}
		},
	});

	useEffect(() => {
		mutate(Cookies.get("token"));
	}, []);

	return (
		<div className='bg-white shadow overflow-hidden sm:rounded-lg container mx-auto'>
			<div className='px-4 py-5 sm:px-6 flex justify-between'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>Профиль</h3>
				<ButtonPassword user={user} />
			</div>
			<div className='border-t border-gray-200'>
				<div>
					{user && (
						<>
							<InputUpdate
								type={EUpdateUser.username}
								user_id={user.id}
								name={user.username}
								label={"Имя пользователя"}
								minLengthValue={3}
								maxLengthValue={50}
								patternValue={/^(?=(?:.*[a-zA-Z]){3})[a-zA-Z0-9]+$/}
								patternMessage='Пароль должен содержать хотя бы три английские буквы (нижний или верхний регистр). Допускаются только латинские буквы и цифры.'
							/>
							<InputUpdate
								type={EUpdateUser.email}
								user_id={user.id}
								name={user.email}
								label={"Почта"}
								minLengthValue={3}
								maxLengthValue={100}
								patternValue={
									/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
								}
								patternMessage='Адрес электронной почты должен содержать:
				Латинские буквы, цифры и символы перед @.
				Доменное имя после @ и доменную зону (например, .com, .co.uk).'
							/>
							<KeyApi user={user} />
							<FormatDate user={user} />
							<IdUser user={user} />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
