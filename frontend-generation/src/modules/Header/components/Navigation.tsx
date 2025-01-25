import { isAuthAtom } from "@/jotai/authentication";
import { useAtomValue } from "jotai";
import { NavLink } from "react-router-dom";
import { navLinks } from "../constants";

export const Navigation = () => {
	const isAuth = useAtomValue(isAuthAtom);

	return (
		<nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
			{navLinks.map(nav => {
				if (
					(nav.status === "not auth" && !isAuth) ||
					(nav.status === "auth" && isAuth) ||
					nav.status === "all"
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
