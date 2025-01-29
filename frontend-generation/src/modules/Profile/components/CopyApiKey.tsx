type Props = {
	api_key: string;
};

export const CopyApiKey = ({ api_key }: Props) => {
	const handlerCopyText = () => {
		navigator.clipboard.writeText(api_key);
	};

	return (
		<>
			<button
				onClick={handlerCopyText}
				className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
			>
				Скопировать API
			</button>
		</>
	);
};
