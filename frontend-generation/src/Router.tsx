import { Route, Routes } from "react-router-dom";
import { Authorization } from "./modules/Authorization";
import { Documentation } from "./modules/Documentation";
import { Profile } from "./modules/Profile";
import { Registration } from "./modules/Registration";

export const Router = () => {
	return (
		<>
			<Routes>
				<Route path='/authorization' element={<Authorization />} />
				<Route path='/documentation' element={<Documentation />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/' element={<Profile />} />
			</Routes>
		</>
	);
};
