/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import LoginPage from "./Pages/Auth/LoginPage";
import SignupPage from "@Pages/Auth/SignupPage";
import HomePage from "@Pages/Home/HomePage";
import { AuthContext, getAuthState } from "@Store/Contexts/AuthContext";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
	);
}

render(
	() => (
		<AuthContext.Provider value={getAuthState}>
			<Router>
				<Route path="/app" component={HomePage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/signup" component={SignupPage} />
			</Router>
		</AuthContext.Provider>
	),
	root!,
);
