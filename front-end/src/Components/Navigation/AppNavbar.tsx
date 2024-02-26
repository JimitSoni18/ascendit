import appNavbarStyles from "./AppNavbar.module.css";
import { Image } from "@kobalte/core";

interface IAppNavbarProps {
	profilePic?: string;
	username?: string;
	links?: { name: string; href: string }[];
}

export default function (props: IAppNavbarProps) {
	return (
		<nav>
			<div>
				<img src="/brand/navbar_logo.svg" alt="Ascendit" width={30} />
			</div>
			<div>
				<Image.Root fallbackDelay={600} class="image">
					<Image.Img
						class={appNavbarStyles.profile_img}
						src={
							props.profilePic ||
							"https://randomuser.me/api/portraits/women/44.jpg"
						}
						alt={props.username}
						width={40}
						height={40}
					/>
					<Image.Fallback class="image__fallback">NS</Image.Fallback>
				</Image.Root>
			</div>
		</nav>
	);
}
