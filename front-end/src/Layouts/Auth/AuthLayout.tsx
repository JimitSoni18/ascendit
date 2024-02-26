import { JSXElement } from "solid-js";
import AuthNavbar, {
	NavbarLinks,
} from "../../Components/Navigation/AuthNavbar";
import authStyles from "./AuthLayout.module.css";

interface IAuthLayoutProps {
	links: NavbarLinks;
	submitHandler(e: Event): void | Promise<void>;
	children: JSXElement;
}

export default function (props: IAuthLayoutProps) {
	return (
		<main class={authStyles.auth_layout}>
			<AuthNavbar links={props.links} />
			<section class={authStyles.form_container}>
				<form
					class={authStyles.form}
					onsubmit={(e) => {
						e.preventDefault();
						props.submitHandler(e);
					}}
				>
					{props.children}
				</form>
			</section>
		</main>
	);
}
