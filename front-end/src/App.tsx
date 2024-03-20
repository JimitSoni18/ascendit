import { Route, Router } from "@solidjs/router";
import "./App.css";
import HomePage from "@Pages/Home/HomePage";
import LoginPage from "@Pages/Auth/LoginPage";
import SignupPage from "@Pages/Auth/SignupPage";
import TestPage from "@Pages/Test/TestPage";

function App() {
	return (
		<Router>
			<Route path="/app" component={HomePage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/signup" component={SignupPage} />
			<Route path="/test/:id" component={TestPage} />
		</Router>
	);
}

export default App;
