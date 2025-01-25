import { isAuthAtom } from "@/jotai/authentication";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
	const navigate = useNavigate();

	const isAuth = useAtomValue(isAuthAtom);

	useEffect(() => {
		if (!isAuth) {
			navigate("/authorization");
		}
	}, []);

	return <>Profile</>;
};
