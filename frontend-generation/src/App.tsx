import { useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { isAuthAtom } from "./jotai/authentication";
import { Footer } from "./modules/Footer";
import { Header } from "./modules/Header";
import { Router } from "./Router";

function App() {
	const setIsAuth = useSetAtom(isAuthAtom);

	useEffect(() => {
		if (Cookies.get("token")) {
			setIsAuth(true);
		}
	}, []);

	return (
		<>
			<Header />
			<Router />
			<Footer />
		</>
	);
}

export default App;
