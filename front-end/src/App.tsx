import type { Component } from "solid-js";
import {createContext, useContext} from "solid-js";
import { A } from "@solidjs/router";
import AppNavbar from "@Components/Navigation/AppNavbar";

// import { AuthDispatch } from "@Store/Stores/AuthStore";

const App: Component = () => {
	return (
		<div>
			{/* <AppNavbar profilePic={} /> */}
			<header>
				<A href="/login">Login</A>
				<A href="/signup">Signup</A>
			</header>
		</div>
	);
};

export default App;
