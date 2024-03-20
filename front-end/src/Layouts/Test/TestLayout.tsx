import styles from './TestLayout.module.css'

type Question = {
	text: string;
	answerOptions: string[];
	correctAnswer: number;
	explanation: string;
}

type TestProps = {
	creator: string;
	title: string;
	questions: Question[];
}

export default function (props: TestProps) {
	return (
		<main class="full-w-container">
			<header class={styles.header}>
				<h1>{props.title}</h1>
				<span>{props.questions.length}</span>
			</header>
			<h3>{}</h3>
		</main>
	)
}