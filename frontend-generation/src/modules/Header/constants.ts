export enum EStatus {
	NotAuth,
	Auth,
	All,
}

export const navLinks = [
	{ path: "/authorization", name: "Авторизация", status: EStatus.NotAuth },
	{ path: "/registration", name: "Регистрация", status: EStatus.NotAuth },
	{ path: "/documentation", name: "Документация", status: EStatus.All },
];
