type Props = {
	name: string;
};

export const ButtonForm = ({ name }: Props) => {
	return (
		<button
			type='submit'
			className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
		>
			{name}
		</button>
	);
};
