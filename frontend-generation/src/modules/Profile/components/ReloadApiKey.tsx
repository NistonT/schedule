import { reloadKeyApi } from "../api/reloadKey.api";

type Props = {
	user_id: number;
};

export const ReloadApiKey = ({ user_id }: Props) => {
	const handlerResetKey = () => {
		reloadKeyApi(user_id);
		location.reload();
	};

	return (
		<>
			<button
				onClick={handlerResetKey}
				className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
			>
				Обновить API
			</button>
		</>
	);
};
