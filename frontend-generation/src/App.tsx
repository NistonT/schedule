import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { isAuthAtom } from "./jotai/authentication";
import { Footer } from "./modules/Footer";
import { Header } from "./modules/Header";
import { Router } from "./Router";
import { isToken } from "./utils/validIsToken";

function App() {
	const setIsAuth = useSetAtom(isAuthAtom);
	useEffect(() => {
		isToken({ setIsAuth });
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
