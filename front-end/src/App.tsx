import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { A } from "@solidjs/router";

const App: Component = () => {
	return (
		<div class={styles.App}>
			<header class={styles.header}>
				<A href="/login">Login</A>
				<A href="/signup">Signup</A>
			</header>
		</div>
	);
};

export default App;
