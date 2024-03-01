import { TextField } from "@kobalte/core";
import homeStyles from "./HomePage.module.css";
import { createSignal, onMount } from "solid-js";
import { useContext } from "solid-js";
import { AuthContext } from "@Store/Contexts/AuthContext";
import { useNavigate } from "@solidjs/router";
import AppLayout from "@Layouts/App/AppLayout";
import TestCard from "@Components/Cards/TestCard";

export default function () {
	const [searchValue, setSearchValue] = createSignal("");

	onMount(() => {
		const userValue = useContext(AuthContext);

		if (!userValue()) {
			useNavigate()("/login", { replace: true });
		}
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
			<section class="container">
				<h2>Top picks for you</h2>
				<div class={homeStyles.card_grid}>
					<TestCard
						title="Who is dis"
						img="/flashcard.webp"
						alt="hemloman?"
						link="https://github.com/JimitSoni18"
					/>
					<TestCard
						title="Who is dis"
						img="/flashcard.webp"
						alt="hemloman?"
						link="https://github.com/JimitSoni18"
					/>
					<TestCard
						title="Who is dis"
						img="/flashcard.webp"
						alt="hemloman?"
						link="https://github.com/JimitSoni18"
					/>
					<TestCard
						title="Who is dis"
						img="/flashcard.webp"
						alt="hemloman?"
						link="https://github.com/JimitSoni18"
					/>
				</div>
			</section>
		</AppLayout>
	);
}
// Card.jsx
