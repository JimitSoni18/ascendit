import cardStyles from "./TestCard.module.css";
import { A } from "@solidjs/router";

interface TestCardProps {
	title: string;
	description?: string;
	link: string;
	img: string;
	alt: string;
}

export default function (props: TestCardProps) {
	return (
		<article class={cardStyles.card}>
			<img src={props.img} alt={props.alt} class={cardStyles.card_image} />
			<div class={cardStyles.card_content}>
				<h4 class={cardStyles.card_title}>Card Title</h4>
				<p class={cardStyles.card_description}>{props.description}</p>
				<A href={props.link} class={cardStyles.card_link}>
					Take test
				</A>
			</div>
		</article>
	);
}
