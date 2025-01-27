import { NavLink } from "react-router-dom";
import { Logout } from "./components/Logout";
import { Navigation } from "./components/Navigation";
import { ProfileModal } from "./components/ProfileModal";

export const Header = () => {
	return (
		<header className='text-gray-600 body-font'>
			<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
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
							fontSize='16'
							fill='#ffffff'
							textAnchor='middle'
							alignmentBaseline='middle'
						>
							AI
						</text>
					</svg>
					<span className='ml-3 text-xl'>ГЕНЕРАТОР API</span>
				</NavLink>
				<Navigation />
				{/* <Login /> */}
				<ProfileModal />
				<Logout />
			</div>
		</header>
	);
};
