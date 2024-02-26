import { createContext, createSignal } from "solid-js";

// const [store, setStore] = createStore();

export function createReactiveContext<T, A = any>(
	initialValue: T,
	reducer: (prev: T, action: A) => T,
) {
	const [state, setState] = createSignal(initialValue);

	const Context = createContext(state);

	function dispatch(action: A) {
		setState((prev) => reducer(prev, action));
	}

	return [Context, dispatch, state] as const;
}
