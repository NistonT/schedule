import { getUserIdApi } from "@/api/getUserId.api";
import { isAuthAtom } from "@/jotai/authentication";
import { IUser } from "@/type/user.type";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CopyApiKey } from "./components/CopyApiKey";
import { ReloadApiKey } from "./components/ReloadApiKey";

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

	const maskApiKey = (apiKey: string): string => {
		return apiKey.substring(0, 4) + "..." + apiKey.substring(apiKey.length - 4);
	};

	//Helper function to format the date (adjust as needed)
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	return (
		<div className='bg-white shadow overflow-hidden sm:rounded-lg container mx-auto'>
			<div className='px-4 py-5 sm:px-6'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>Профиль</h3>
			</div>
			<div className='border-t border-gray-200'>
				<dl>
					{user && (
						<>
							<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Имя пользователя
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{user.username}
								</dd>
							</div>
							<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Почта</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{user.email}
								</dd>
							</div>
							<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Идентификатор пользователя
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{user.id}
								</dd>
							</div>
							<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>API ключ</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center'>
									{maskApiKey(user.api_key)}
									<div className='flex gap-4'>
										<ReloadApiKey user_id={user.id} />
										<CopyApiKey api_key={user.api_key} />
									</div>
								</dd>
							</div>
							<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Дата создания
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{formatDate(user.created_at)}
								</dd>
							</div>
						</>
					)}
				</dl>
			</div>
		</div>
	);
};
