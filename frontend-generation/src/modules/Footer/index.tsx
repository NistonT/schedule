import { NavLink } from "react-router-dom";

export const Footer = () => {
	return (
		<footer className='text-gray-600 body-font'>
			<div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col'>
				<NavLink
					to={"/"}
					className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
				>
					<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'>
						<rect
							width='100%'
							height='100%'
							rx='10.0'
							ry='10.0'
							fill='#0074D9'
						/>
						<text
							x='50%'
							y='52%'
							font-size='16'
							fill='#ffffff'
							text-anchor='middle'
							alignment-baseline='middle'
						>
							AI
						</text>
					</svg>
					<span className='ml-3 text-xl'>ГЕНЕРАТОР API</span>
				</NavLink>
				<p className='text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4'>
					© 2025 niston —
					<a
						href='https://github.com/NistonT'
						className='text-gray-600 ml-1'
						rel='noopener noreferrer'
						target='_blank'
					>
						@NistonT
					</a>
				</p>
				<span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'></span>
			</div>
		</footer>
	);
};
