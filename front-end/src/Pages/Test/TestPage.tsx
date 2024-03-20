import { useParams } from "@solidjs/router";
import styles from "./TestPage.module.css";
import {
	For,
	Show,
	Suspense,
	createEffect,
	createResource,
	createSignal,
	onMount,
} from "solid-js";
import { APIManager } from "@util/apiManager";
import { RadioGroup } from "@kobalte/core";

type Question = {
	text: string;
	answerOptions: string[];
	correctAnswer: number;
	explanation: string;
};

type Test = {
	creator: string;
	title: string;
	questions: Question[];
};

async function fetchData(id: string) {
	const apiManager = APIManager.getInstance();

	return await apiManager.get(`/api/tests/${id}`);
}

export default function () {
	const params = useParams();
	const [test] = createResource<Test, string>(params.id, fetchData);
	const [currentQuestion, setCurrentQuestion] = createSignal(0);
	onMount(() => {
		console.log(params);
	});
	createEffect(() => {
		console.log("test: ", test());
	});
	return (
		<Suspense
			fallback={
				<div class="absolute inset-0 h-full w-full flex justify-center items-center backdrop-blur-xl backdrop-brightness-150">
					<img
						src="/ascendit_logo.webp"
						alt="Ascendit"
						height={300}
						width={300}
					/>
				</div>
			}
		>
			<Show when={Boolean(test())}>
				<main class="full-w-container">
					<header class={styles.header}>
						<h4>{test()?.title}</h4>
						<span>{test()?.questions.length}</span>
					</header>
					<div>
						<span></span>
						<div class={styles.question_section}>
							<div class={styles.question_container}>
								<h3>
									{(currentQuestion() + 1)
										.toString()
										.padStart(
											test()?.questions.length > 99
												? currentQuestion() + 1 > 9
													? 3
													: 2
												: 2,
											"0"
										)}
									.
								</h3>
								<h3>{test()?.questions[currentQuestion()]?.text}</h3>
							</div>
							<div class={styles.options_grid}>
								<For each={test()?.questions[currentQuestion()]?.answerOptions}>
									{(option) => <>{option}</>}
								</For>
							</div>
						</div>
						<span></span>
					</div>
				</main>
			</Show>
		</Suspense>
	);
}
