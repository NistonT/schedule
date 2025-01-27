import { isAuthAtom } from "@/jotai/authentication";
import { useAtomValue } from "jotai";
import { NavLink, useLocation } from "react-router-dom";
import { EStatus, navLinks } from "../constants";

export const Navigation = () => {
	const isAuth = useAtomValue(isAuthAtom);
	const location = useLocation();

	const isActive = location.pathname;

	return (
		<nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
			{navLinks.map(nav => {
				if (
					(nav.status === EStatus.NotAuth && !isAuth) ||
					(nav.status === EStatus.Auth && isAuth) ||
					nav.status === EStatus.All
				) {
					return (
						<NavLink
							to={nav.path}
							className={`relative mr-5 text-gray-700 hover:text-gray-900 group ${
								isActive === nav.path ? "text-gray-900" : ""
							}`}
							key={nav.path}
						>
							{nav.name}
							<div className='absolute left-0 bottom-0 h-0.5 bg-black w-0 group-hover:w-full transition-all duration-300 ease-in-out' />
						</NavLink>
					);
				}
				return null;
			})}
		</nav>
	);
};
