import { TextField } from "@kobalte/core";
import homeStyles from "./HomePage.module.css";
import {
	For,
	Show,
	Suspense,
	createEffect,
	createResource,
	createSignal,
	onMount,
} from "solid-js";
import { useContext } from "solid-js";
import { AuthContext } from "@Store/Contexts/AuthContext";
import { useNavigate } from "@solidjs/router";
import AppLayout from "@Layouts/App/AppLayout";
import TestCard from "@Components/Cards/TestCard";
import { APIManager } from "@util/apiManager";
import { TestList } from "src/Types/TestTypes";

async function fetchData() {
	const apiManager = APIManager.getInstance();

	return await apiManager.get("/api/tests");
}

export default function () {
	const [searchValue, setSearchValue] = createSignal("");

	const [testData] = createResource<TestList>(fetchData);

	onMount(() => {
		const userValue = useContext(AuthContext);

		if (!userValue()) {
			useNavigate()("/login", { replace: true });
		}
	});

	createEffect(() => {
		console.log(testData(), "this is testData");
	});

	return (
		<AppLayout>
			<header class={homeStyles.home_header}>
				<div class={homeStyles.header_container}>
					<TextField.Root name="search-tests" class={homeStyles.search_root}>
						<TextField.Input
							class={homeStyles.search_input}
							placeholder="Search"
							value={searchValue()}
							onchange={(e) => setSearchValue(e.target.value)}
						/>
					</TextField.Root>
					<button
						class="btn-primary"
						type="button"
						onclick={() => {
							alert(searchValue());
						}}
					>
						Search
					</button>
				</div>
			</header>
			<section class="cosmic-container-p">
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
					<Show when={testData()}>
						<h2>Top picks for you</h2>
						<div class={homeStyles.card_grid}>
							<For each={testData()}>
								{(test) => (
									<TestCard
										title={test.title}
										img="/flashcard.webp"
										alt="hemloman?"
										link={`/test/${test._id}`}
									/>
								)}
							</For>
						</div>
					</Show>
				</Suspense>
			</section>
		</AppLayout>
	);
}
// Card.jsx
