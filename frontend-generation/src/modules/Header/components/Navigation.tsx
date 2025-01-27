import { isAuthAtom } from "@/jotai/authentication";
import { useAtomValue } from "jotai";
import { NavLink } from "react-router-dom";
import { EStatus, navLinks } from "../constants";

export const Navigation = () => {
	const isAuth = useAtomValue(isAuthAtom);

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
							className='mr-5 hover:text-gray-900'
							key={nav.path}
						>
							{nav.name}
						</NavLink>
					);
				}
				return null;
			})}
		</nav>
	);
};
