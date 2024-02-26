import { JSXElement } from "solid-js";
import AuthNavbar, {
	NavbarLinks,
} from "../../Components/Navigation/AuthNavbar";
import authStyles from "../Auth/AuthLayout.module.css";

interface IAuthLayoutProps {
	links?: NavbarLinks;
	children: JSXElement;
}

export default function (props: IAuthLayoutProps) {
	return (
		<main class={authStyles.auth_layout}>
			<AuthNavbar links={props.links} />
			{props.children}
		</main>
	);
}
