import { Route, Routes } from "react-router-dom";
import { Authorization } from "./modules/Authorization";
import { Documentation } from "./modules/Documentation";
import { Header } from "./modules/Header";
import { Profile } from "./modules/Profile";
import { Registration } from "./modules/Registration";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/authorization' element={<Authorization />} />
				<Route path='/documentation' element={<Documentation />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/' element={<Profile />} />
			</Routes>
		</>
	);
}

export default App;
