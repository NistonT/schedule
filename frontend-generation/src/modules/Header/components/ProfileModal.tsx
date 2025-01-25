import { isAuthAtom } from "@/jotai/authentication";
import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";

export const ProfileModal = () => {
	const isAuth = useAtomValue(isAuthAtom);

	return (
		<>
			{isAuth && (
				<Link to={"/"}>
					{" "}
					<button className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
						Профиль
					</button>
				</Link>
			)}
		</>
	);
};
