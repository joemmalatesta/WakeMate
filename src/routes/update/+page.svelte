<svelte:head>
	<title>WakeMate | Update</title>
	<meta name="description" content="Update wake up settings.">
</svelte:head>


<script lang="ts">
	import ValidateModal from '../../components/ValidateForm.svelte';
	let phoneNumber: string;
	export let form;
	let formOutput: any;
	$: formOutput = form?.output || '';
	$: formUser = form?.user || undefined;
	$: console.log(formUser);
	$: if (formUser) {
		console.log(formUser[0] || '');
	}

	const times = [
		'4:00am',
		'5:00am',
		'6:00am',
		'7:00am',
		'8:00am',
		'4:30am',
		'5:30am',
		'6:30am',
		'7:30am',
		'8:30am',
		'9:00am',
		'9:30am',
		'10:00am'
	];

	const timeZones: string[] = [
		'GMT-12:00',
		'GMT-11:00',
		'GMT-10:00',
		'GMT-09:00',
		'GMT-08:00',
		'GMT-07:00',
		'GMT-06:00',
		'GMT-05:00',
		'GMT-04:00',
		'GMT-03:30',
		'GMT-03:00',
		'GMT-02:00',
		'GMT-01:00',
		'GMT+00:00',
		'GMT+01:00',
		'GMT+02:00',
		'GMT+03:00',
		'GMT+03:30',
		'GMT+04:00',
		'GMT+04:30',
		'GMT+05:00',
		'GMT+05:30',
		'GMT+05:45',
		'GMT+06:00',
		'GMT+06:30',
		'GMT+07:00',
		'GMT+08:00',
		'GMT+08:45',
		'GMT+09:00',
		'GMT+09:30',
		'GMT+10:00',
		'GMT+10:30',
		'GMT+11:00',
		'GMT+12:00',
		'GMT+12:45',
		'GMT+13:00',
		'GMT+14:00'
	];

	let active: any;
	$: if (formUser) {
		active = formUser.active;
	}
</script>

<!-- HERE IS WHERE YOU UNSUBSCRIBE AS WELL -->

<main class="relative">
	<div class="relative text-center text-5xl font-extrabold md:text-7xl">
		<h1 class="">Change how you wake up</h1>
		<p class="absolute inset-0 opacity-40 blur-md">Change how you wake up</p>
	</div>
	{#if !formUser}
		<p class="mt-4 text-center font-extrabold text-[#d2cff0] md:text-xl">
			Change the time you wake up, what days you get called, your time zone, or just pause the calls
			all together.
		</p>
	{/if}
	{#if !formUser}
		<form
			action="?/sendUpdateValidation"
			method="POST"
			class="flex justify-center items-center flex-col mt-8"
		>
			<input
				class="w-full rounded-t-lg p-3 text-xl text-black placeholder:text-center placeholder:text-neutral-700/80 md:text-2xl lg:w-3/4 2xl:w-2/5"
				type="tel"
				name="phone"
				inputmode="numeric"
				id="phone"
				placeholder="Your phone number"
			/>
			<button
				type="submit"
				class="w-full rounded-b-lg bg-[#4437b0] p-3 text-xl font-semibold drop-shadow-lg hover:bg-[#2e257a] md:text-2xl lg:w-3/4 2xl:w-2/5"
				>Submit</button
			>
			{#if formOutput === 'number failure'}
				<p class="font-thin text-red-400">Enter valid phone number</p>
			{:else if formOutput === 'not duplicate'}
				<p class="font-thin text-red-400">
					Number not Registered <span
						><a
							class="underline underline-offset-2 hover:underline-offset-4 transition-all"
							href="/">Register Instead?</a
						></span
					>
				</p>
			{/if}

			{#if formOutput === 'success' || formOutput === 'validation failure'}
				<div
					class="absolute z-20 flex items-center justify-center rounded-xl bg-violet-500/90 px-10 py-6"
				>
					<ValidateModal bind:formOutput />
				</div>
			{/if}
		</form>
	{/if}

	<!-- UPDATE USER FORM -->
	{#if formUser}
		<div
			class="py-4 flex md:flex-row flex-col items-center md:items-end justify-center md:gap-5 gap-1"
		>
			<p class="lg:text-6xl md:text-4xl text-3xl">{formUser.phoneNumber}</p>
			<p class="lg:text-4xl text-2xl">{formUser.status} plan</p>
		</div>
		<form action="?/updateUser" method="POST" class="flex flex-col justify-center items-center">
			<div
				class="flex flex-col justify-center items-center p-10 md:gap-1 gap-3"
			>
				<div class="flex md:flex-row flex-col justify-between items-center w-[29rem]">
					<p class="md:text-xl text-lg">Service</p>
					<button
						type="button"
						class="w-60 text-xl p-2 rounded-lg {active == "false"
							? 'bg-red-600/80'
							: 'bg-green-600/80'} {active == "false" ? 'hover:bg-red-700/80' : 'hover:bg-green-700/80'}"
						on:click={() => {
							if (active == "false"){
								active = "true"
							}
							else{
								active = ' false'
							}
						}}>{active == "false" ? 'Inactive' : 'Active'}</button
					>
				</div>
				<input type="text" class="hidden" name="active" bind:value={active} />
				<div class="flex md:flex-row flex-col justify-between items-center w-[29rem]">
					<p class="md:text-xl text-lg">Wake Up Time</p>
					<select
						name="wakeUpTime"
						class="text-black w-60 px-4 py-2 border border-gray-300 rounded-md focus:-none focus:ring-2 focus:ring-indigo-500"
					>
					<option value={formUser['wakeUpTime']}>Current - {formUser['wakeUpTime']}</option>
						{#each times as time}
							<option value={time}>{time}</option>
						{/each}
					</select>
				</div>
				<div class="flex md:flex-row flex-col justify-between items-center w-[29rem]">
					<p class="md:text-xl text-lg">Weekends</p>
					
					<select
						name="weekends"
						class="text-black w-60 px-4 py-2 border border-gray-300 rounded-md focus:-none focus:ring-2 focus:ring-indigo-500"
					>
						<option value={formUser["weekends"]}>Current - {formUser["weekends"] == "true"? "Yes" : "No"}</option>
						<option value={true}>Yes</option>
						<option value={false}>No</option>
					</select>
				</div>
				<div class="flex md:flex-row flex-col justify-between items-center w-[29rem]">
					<p class="md:text-xl text-lg">Time Zone</p>
					<select
						name="offset"
						class="text-black w-60 px-4 py-2 border border-gray-300 rounded-md focus:-none focus:ring-2 focus:ring-indigo-500"
					>	
						<option value={formUser["offset"]}>Current - {formUser["offset"]}</option>
						{#each timeZones as time}
							<option value={time}>{time}</option>
						{/each}
					</select>
				</div>
			</div>
			<button
				type="submit"
				class="w-60 p-3 bg-green-500/80 hover:bg-green-600/80 rounded-md mt-10"
				>Save</button
			>
		</form>
	{/if}

	{#if formOutput === true}
		<p class="text-center pt-10 text-2xl">Successfully Updated Profile :)</p>
	{/if}
</main>

<!-- Modal black out ! -->
{#if formOutput === 'success' || formOutput === 'validation failure'}
	<div class="-z-1 absolute inset-0 h-screen w-screen overflow-hidden bg-neutral-900 opacity-90" />
{/if}
