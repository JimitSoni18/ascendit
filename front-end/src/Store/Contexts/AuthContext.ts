import { createContext } from "solid-js";

export interface IAuthContext {
	username: string;
	profile_pic?: string;
	email?: string;
}

export function createAuthContext(value: IAuthContext) {
	return createContext<IAuthContext>(value);
}
