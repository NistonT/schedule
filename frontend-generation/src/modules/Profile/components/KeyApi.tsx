import { IUser } from "@/type/user.type";
import { CopyApiKey } from "./CopyApiKey";
import { ReloadApiKey } from "./ReloadApiKey";

type Props = {
	user: IUser;
};

export const KeyApi = ({ user }: Props) => {
	const maskApiKey = (apiKey: string): string => {
		return apiKey.substring(0, 4) + "..." + apiKey.substring(apiKey.length - 4);
	};

	return (
		<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
			<div className='text-sm font-medium text-gray-500'>API ключ</div>
			<div className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center'>
				{maskApiKey(user.api_key)}
				<div className='flex gap-4'>
					<ReloadApiKey user_id={user.id} />
					<CopyApiKey api_key={user.api_key} />
				</div>
			</div>
		</div>
	);
};
