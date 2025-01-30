import { IUser } from "@/type/user.type";

type Props = {
	user: IUser;
};

export const IdUser = ({ user }: Props) => {
	return (
		<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
			<div className='text-sm font-medium text-gray-500'>
				Идентификатор пользователя
			</div>
			<div className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
				{user.id}
			</div>
		</div>
	);
};
