import { createStore } from "solid-js/store";
import type { IAuthContext } from "../Contexts/AuthContext";
import { createContext } from "solid-js";

// const [store, setStore] = createStore();

function createReactiveContext<T extends object, A>(initialValue: T, reducer: (action: A) => T) {
	const [state, setState] = createStore(initialValue);

	const Context = createContext(state)

	function dispatch(action: A) {
		setState(reducer(action));
	}

	return [Context, dispatch];
}
