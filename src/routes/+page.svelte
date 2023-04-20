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
</script>

<!-- INTRO BIT -->
<main class="lg:mx-40 mx-4 mt-16 relative">
	<div class="relative text-center md:text-7xl text-5xl font-extrabold">
		<h1 class="">Take back your morning</h1>
		<p class="absolute inset-0 blur opacity-40">Take back your morning</p>
	</div>
	<p class="text-center md:text-xl font-extrabold mt-4 text-[#d2cff0]">
		Get a wake up call each morning, giving you motivation for the day ahead
	</p>

	<!-- NUMBER FORM -->
	<form
		method="POST"
		action="?/sendValidation"
		class="flex justify-center items-center flex-col mt-8 relative"
	>
		<input
			class="w-full 2xl:w-1/3 lg:w-3/4 p-3 text-black md:text-2xl text-xl placeholder:text-center rounded-t-lg placeholder:text-neutral-700/80"
			type="tel"
			name="phone"
			inputmode="numeric"
			id="phone"
			placeholder="Your phone number"
		/>
		<ul class="flex flex-wrap justify-between items-center w-full 2xl:w-1/3 lg:w-3/4">
			{#each times as time, index}
				<button
					type="button"
					class="w-1/5 h-12 flex justify-center items-center border border-[#5a4ecc] cursor-pointer {selectedTime ==
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
			class="w-full bg-[#4437b0] hover:bg-[#2e257a] p-3 2xl:w-1/3 lg:w-3/4 rounded-b-lg md:text-2xl text-xl font-semibold drop-shadow-lg"
			>Wake me up {times[selectedTime] ? `at ${times[selectedTime]}` : ''}</button
		>
		{#if formOutput === 'time failure'}
			<p class="text-red-400 font-thin">Select wake up time</p>
		{:else if formOutput === 'number failure'}
			<p class="text-red-400 font-thin">Enter valid phone number</p>
		{/if}

		<!-- Modal if form success -->
		{#if formOutput === 'success' || formOutput === 'validation failure'}
			<div
				class="absolute flex justify-center items-center py-6 px-10 bg-neutral-300 z-20 rounded-xl"
			>
				<ValidateModal bind:formOutput />
			</div>
		{/if}
	</form>

	<!-- <section id="about" class="mt-40">
		<About />
</section> -->

	<section id="pricing" class="my-40">
		<div class="relative text-center md:text-6xl text-4xl font-extrabold mb-7">
			<h1 class="">Pricing</h1>
			<p class="absolute inset-0 blur opacity-40">Pricing</p>
		</div>
		<Pricing />
	</section>
</main>
{#if formOutput === 'success' || formOutput === 'validation failure'}
	<div class="absolute inset-0 h-screen w-screen bg-neutral-900 opacity-90 -z-1 overflow-hidden" />
{/if}
