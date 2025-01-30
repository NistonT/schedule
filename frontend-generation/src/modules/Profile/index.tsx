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
			<div className='px-4 py-5 sm:px-6'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>Профиль</h3>
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
							/>
							<InputUpdate
								type={EUpdateUser.email}
								user_id={user.id}
								name={user.email}
								label={"Почта"}
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
