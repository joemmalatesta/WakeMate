<svelte:head>
	<title>WakeMate</title>
	<meta name="description" content="Take back your morning and stay motivated throughout the day with WakeMate, a wake up call service focused on self improvement">
</svelte:head>

<script lang="ts">
	import Benefits from '../components/Benefits.svelte';
	import Pricing from '../components/Pricing.svelte';
	import ValidateModal from '../components/ValidateForm.svelte';

	export let form;
	let formOutput: string;
	let formTime: string;
	$: formOutput = form?.output || '';
	$: formTime = form?.time;
	let times = [
		'04:00am',
		'05:00am',
		'06:00am',
		'07:00am',
		'08:00am',
		'04:30am',
		'05:30am',
		'06:30am',
		'07:30am',
		'08:30am'
	];
	let selectedTime = -1;
	let weekends: any = -1;
</script>

<!-- INTRO BIT -->
<main class="relative">
	<div class="relative text-center text-5xl font-extrabold md:text-7xl">
		<h1 class="">{formOutput === 'validation success' ? 'Welcome to WakeMate!' : 'Take back your morning'}</h1>
		<p class="absolute inset-0 opacity-40 blur-md">
			{formOutput === 'validation success' ? 'Welcome to WakeMate!' : 'Take back your morning'}
		</p>
	</div>
	<!-- <p class="mt-4 text-center font-extrabold text-[#d2cff0] md:text-2xl">
			Don't wake up to your alarm but jump out of bed when you get a call?
	</p> -->
	<p class=" text-center font-extrabold text-[#d2cff0] md:text-2xl mt-4">
		{formOutput === 'validation success'
			? `We'll wake you up tomorrow at ${formTime}`
			: 'Get a wake up call each morning, giving you motivation for the day ahead'}
	</p>

	<!-- NUMBER AND TIME FORM -->
	<form
		method="POST"
		action="?/sendValidation"
		class="relative mt-8 flex flex-col items-center justify-center"
	>
		<input
			class="w-full rounded-t-lg p-3 text-xl text-black placeholder:text-center placeholder:text-neutral-700/80 md:text-2xl lg:w-3/4 2xl:w-2/5"
			type="tel"
			name="phone"
			inputmode="numeric"
			id="phone"
			placeholder="Your phone number"
		/>
		<ul class="flex w-full flex-wrap items-center justify-between lg:w-3/4 2xl:w-2/5">
			{#each times as time, index}
				<button
					type="button"
					class="flex h-12 w-1/5 cursor-pointer items-center justify-center border border-[#5a4ecc] hover:bg-[#4437b0] transition-all {selectedTime ==
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
		<div class="flex justify-around w-full lg:w-3/4 2xl:w-2/5 bg-indigo-400">
			<div
				class="p-2 text-center cursor-pointer w-1/2 border border-[#5a4ecc] hover:bg-[#4437b0] text-lg {weekends ==
				true
					? 'bg-[#4437b0]'
					: 'bg-[#786afa]'}"
				on:click={() => {
					weekends = true;
				}}
				on:keypress={() => {
					weekends = true;
				}}
			>
				Weekends
			</div>
			<div
				class="p-2 text-center cursor-pointer w-1/2 border border-[#5a4ecc] hover:bg-[#4437b0] text-lg {weekends ==
				false
					? 'bg-[#4437b0]'
					: 'bg-[#786afa]'}"
				on:click={() => {
					weekends = false;
				}}
				on:keypress={() => {
					weekends = false;
				}}
			>
				No Weekends
			</div>
		</div>
		<!-- Can't use undefined, null, -1 what CAN I DO?> -->
		<input class="hidden" name="weekends" value={weekends} />

		<button
			type="submit"
			class="w-full rounded-b-lg bg-[#4437b0] p-3 text-xl font-semibold drop-shadow-lg hover:bg-[#2e257a] md:text-2xl lg:w-3/4 2xl:w-2/5"
			>Wake me up {times[selectedTime] ? `at ${times[selectedTime]}` : ''}</button
		>
		{#if formOutput === 'time failure'}
			<p class="font-thin text-red-400">Select wake up time</p>
		{:else if formOutput === 'number failure'}
			<p class="font-thin text-red-400">Enter valid phone number</p>
		{:else if formOutput === 'weekends failure'}
			<p class="font-thin text-red-400">Select weekend preferences</p>
		{:else if formOutput === 'duplicate'}
			<p class="font-thin text-red-400">
				Number already Registered <span
					><a
						class="underline underline-offset-2 hover:underline-offset-4 transition-all"
						href="/update">Update Instead?</a
					></span
				>
			</p>
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

	<section id="benefits" class="lg:mt-40 mt-20 flex flex-col justify-center">
		<div class="relative text-center text-4xl font-extrabold md:text-6xl">
			<h1 class="">Benefits</h1>
			<p class="absolute inset-0 opacity-40 blur">Benefits</p>
		</div>
		<p class="mt-4 text-center font-extrabold text-[#d2cff0] md:text-xl mx-8">
			See the advantages Wake Up Call has over your everyday alarm
		</p>
		<Benefits />
	</section>

	<!-- PRICING -->
	<section id="pricing" class="lg:mt-40 mt-20">
		<div class="relative mb-7 text-center text-4xl font-extrabold md:text-6xl">
			<h1 class="">Pricing</h1>
			<p class="absolute inset-0 opacity-40 blur">Pricing</p>
		</div>
		<p class="my-4 text-center font-extrabold text-[#d2cff0] md:text-xl mx-6">
			Get more from your mornings, and stay focused throughout the day. <span
				><a
					class="underline-offset-2 hover:underline-offset-4 underline transition-all"
					href="https://joemmalatesta.com/#contact">Let me know</a
				></span
			> if need some help, though
		</p>
		<Pricing />
	</section>
</main>
{#if formOutput === 'success' || formOutput === 'validation failure'}
	<div class="-z-1 absolute inset-0 h-screen w-screen overflow-hidden bg-neutral-900 opacity-90" />
{/if}
