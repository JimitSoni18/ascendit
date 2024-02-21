import type { Component } from "solid-js";

import { A } from "@solidjs/router";

const App: Component = () => {
	return (
		<div>
			<header>
				<A href="/login">Login</A>
				<A href="/signup">Signup</A>
			</header>
		</div>
	);
};

export default App;
