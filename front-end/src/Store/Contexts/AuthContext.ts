import { createReactiveContext } from "@jimitsoni18/solid-hooks";

interface IUser {
	id: string;
	username: string;
	profile_pic?: string;
}

type UserDispatchAction =
	| {
			type: "login";
			payload: IUser;
	  }
	| {
			type: "logout";
	  };

const USER_KEY = "user_info";

function userReducer(_: null | IUser, action: UserDispatchAction) {
	if (action.type === "login") {
		setUserIntoLocalStorage(action.payload);
		return action.payload;
	}
	removeUserFromLocalStorage();
	return null;
}

function removeUserFromLocalStorage() {
	localStorage.removeItem(USER_KEY);
}

function setUserIntoLocalStorage(user: IUser) {
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getFromLocalStorage(): IUser | null {
	const received = localStorage.getItem(USER_KEY);

	if (received) {
		try {
			return JSON.parse(received);
		} catch (err) {
			return null;
		}
	}
	return null;
}

const [AuthContext, authDispatch, getAuthState] = createReactiveContext<
	null | IUser,
	UserDispatchAction
>(getFromLocalStorage() || null, userReducer);

export { AuthContext, authDispatch, getAuthState };
