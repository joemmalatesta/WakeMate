<script lang="ts">
	import Pricing from '../components/Pricing.svelte';
	import ValidateModal from '../components/ValidateForm.svelte';

	export let form;
	let formOutput: string;
	$: formOutput = form?.output || '';
	let times = [
		'4:00am',
		'5:00am',
		'6:00am',
		'7:00am',
		'8:00am',
		'4:30am',
		'5:30am',
		'6:30am',
		'7:30am',
		'8:30am'
	];
	let selectedTime = -1;

	// $: document.body.style.overflow = (formOutput === 'success' || formOutput === "validation failure") ? 'hidden' : 'auto';
</script>

<!-- INTRO BIT -->
<main class="relative mx-4 mt-16 lg:mx-40">
	<div class="relative text-center text-5xl font-extrabold md:text-7xl">
		<h1 class="">Take back your morning</h1>
		<p class="absolute inset-0 opacity-40 blur">Take back your morning</p>
	</div>
	<p class="mt-4 text-center font-extrabold text-[#d2cff0] md:text-xl">
		Get a wake up call each morning, giving you motivation for the day ahead
	</p>

	<!-- NUMBER FORM -->
	<form
		method="POST"
		action="?/sendValidation"
		class="relative mt-8 flex flex-col items-center justify-center"
	>
		<input
			class="w-full rounded-t-lg p-3 text-xl text-black placeholder:text-center placeholder:text-neutral-700/80 md:text-2xl lg:w-3/4 2xl:w-1/3"
			type="tel"
			name="phone"
			inputmode="numeric"
			id="phone"
			placeholder="Your phone number"
		/>
		<ul class="flex w-full flex-wrap items-center justify-between lg:w-3/4 2xl:w-1/3">
			{#each times as time, index}
				<button
					type="button"
					class="flex h-12 w-1/5 cursor-pointer items-center justify-center border border-[#5a4ecc] {selectedTime ==
					index
						? 'bg-[#4437b0]'
						: 'bg-[#786afa]'}"
					on:click={() => {
						selectedTime = index;
					}}
					on:keypress={() => {
						selectedTime = index;
					}}>{time}</button
				>
			{/each}
		</ul>
		<input class="hidden" name="time" value={times[selectedTime] || null} />

		<button
			type="submit"
			class="w-full rounded-b-lg bg-[#4437b0] p-3 text-xl font-semibold drop-shadow-lg hover:bg-[#2e257a] md:text-2xl lg:w-3/4 2xl:w-1/3"
			>Wake me up {times[selectedTime] ? `at ${times[selectedTime]}` : ''}</button
		>
		{#if formOutput === 'time failure'}
			<p class="font-thin text-red-400">Select wake up time</p>
		{:else if formOutput === 'number failure'}
			<p class="font-thin text-red-400">Enter valid phone number</p>
		{/if}

		<!-- Modal if form success -->
		{#if formOutput === 'success' || formOutput === 'validation failure'}
			<div
				class="absolute z-20 flex items-center justify-center rounded-xl bg-violet-500/90 px-10 py-6"
			>
				<ValidateModal bind:formOutput />
			</div>
		{/if}
	</form>

	<!-- <section id="about" class="mt-40">
		<About />
</section> -->

	<section id="pricing" class="my-40">
		<div class="relative mb-7 text-center text-4xl font-extrabold md:text-6xl">
			<h1 class="">Pricing</h1>
			<p class="absolute inset-0 opacity-40 blur">Pricing</p>
		</div>
		<Pricing />
	</section>
</main>
{#if formOutput === 'success' || formOutput === 'validation failure'}
	<div class="-z-1 absolute inset-0 h-screen w-screen overflow-hidden bg-neutral-900 opacity-90" />
{/if}
