import TextFieldWValidation from "@Components/Form/TextFieldWValidation";
import AuthLayout from "@Layouts/Auth/AuthLayout";
import { Button } from "@kobalte/core";
import loginStyles from "./LoginPage.module.css";
import { createSignal } from "solid-js";
import { authDispatch } from "@Store/Contexts/AuthContext";
import { useNavigate } from "@solidjs/router";

function validateEmail(email: string) {
	const emailRegex = /^(?!-)[a-zA-Z0-9\-_]+[^\-]@[^@\s]+\.\w{2,7}/;
	return emailRegex.test(email);
}

function validatePassword(password: string) {
	return password.length > 8;
}

export default function () {
	const navigate = useNavigate();
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");

	async function login(_: Event) {
		let body: string;
		try {
			body = JSON.stringify({ email: email(), password: password() });
		} catch (err) {
			alert("Cannot parse your input.");
			return;
		}
		let result = await fetch("/api/auth/login", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body,
		})
			.then((res) => res.json())
			.catch((err) => {
				alert(err);
			});

		if (result === undefined || "error" in result) {
			alert(result.error);
			return;
		}

		authDispatch({
			type: "login",
			payload: { id: result.id, username: result.email },
		});

		navigate("/app", { replace: true });
	}

	return (
		<AuthLayout
			links={[{ href: "/signup", name: "Sign Up" }]}
			submitHandler={login}
		>
			<TextFieldWValidation
				value={email}
				setValue={setEmail}
				pattern="^(?!-)[a-zA-Z0-9\-_]+[^\-]@[^@\s]+\.\w{2,7}"
				placeholder="jdoe@johnd.com"
				fieldName="Email"
				validate={validateEmail}
			/>
			<TextFieldWValidation
				type="password"
				value={password}
				setValue={setPassword}
				fieldName="Password"
			/>
			<Button.Root type="submit" class={loginStyles.signin_btn}>
				Sign In
			</Button.Root>
		</AuthLayout>
	);
}
