import { IUser } from "@/type/user.type";

type Props = {
	user: IUser;
};

export const FormatDate = ({ user }: Props) => {
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	return (
		<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
			<div className='text-sm font-medium text-gray-500'>Дата создания</div>
			<div className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
				{formatDate(user.created_at)}
			</div>
		</div>
	);
};
