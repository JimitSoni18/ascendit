import TextFieldWValidation from "@Components/Form/TextFieldWValidation";
import AuthLayout from "@Layouts/Auth/AuthLayout";
import { Button } from "@kobalte/core";
import loginStyles from "./LoginPage.module.css";
import { createSignal } from "solid-js";

function validateEmail(email: string) {
	const emailRegex = /^(?!-)[a-zA-Z0-9\-_]+[^\-]@[^@\s]+\.\w{2,7}/;
	return emailRegex.test(email);
}

function validatePassword(password: string) {
	return password.length > 8;
}

export default function () {
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");

	async function signup(_: Event) {
		let body: string;
		try {
			body = JSON.stringify({ email: email(), password: password() });
		} catch (err) {
			alert("Cannot parse your input.");
			return;
		}
		let result = await fetch("/api/auth/signup", {
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
			alert("Unable to signup");
		}
	}

	return (
		<AuthLayout
			links={[{ href: "/signup", name: "Sign Up" }]}
			submitHandler={signup}
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
				validate={validatePassword}
				description="Password should be strong"
			/>
			<Button.Root type="submit" class={loginStyles.signin_btn}>
				Sign Up
			</Button.Root>
		</AuthLayout>
	);
}
