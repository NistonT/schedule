type Props = {
	message: string;
};

export const MessageGreen = ({ message }: Props) => {
	return (
		<div className='relative left-1/2 transform -translate-x-1/2 mb-4 w-full max-w-md mx-auto bg-green-500 text-white rounded-lg shadow-lg p-4 flex items-center justify-between'>
			<span>{message}</span>
			<span className='text-white ml-4'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='w-6 h-6'
				>
					<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
					<path d='M22 4L12 14.01l-3-3'></path>
				</svg>
			</span>
		</div>
	);
};
