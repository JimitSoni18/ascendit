import { JSXElement } from "solid-js";
import AuthNavbar, {
	NavbarLinks,
} from "../../Components/Navigation/AuthNavbar";

interface IAuthLayoutProps {
	links?: NavbarLinks;
	children: JSXElement;
}

export default function (props: IAuthLayoutProps) {
	return (
		<main>
			<AuthNavbar links={props.links} />
			{props.children}
		</main>
	);
}
