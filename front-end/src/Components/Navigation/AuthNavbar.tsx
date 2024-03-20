import { A } from "@solidjs/router";
import authNavStyles from "./AuthNavbar.module.css";
import { For } from "solid-js";

export type NavbarLinks = { name: string; href: string }[];

export default function (props: { links?: NavbarLinks }) {
	return (
		<nav class={authNavStyles.auth_navbar}>
			<div>
				<img src="/ascendit_logo.webp" alt="Ascendit" width={30} />
			</div>
			<div class={authNavStyles.links}>
				<For each={props.links}>
					{(link) => <A href={link.href}>{link.name}</A>}
				</For>
			</div>
		</nav>
	);
}
