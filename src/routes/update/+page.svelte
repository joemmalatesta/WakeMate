<script lang="ts">
    import ValidateModal from '../../components/ValidateForm.svelte';
    let phoneNumber: string;
    export let form;
	let formOutput: string;
	$: formOutput = form?.output || '';
	$: formUser = form?.user || undefined
	$: console.log(formUser)
	$: if (formUser) {
		console.log(formUser[0] || "")
	}
	
	
</script>
<!-- HERE IS WHERE YOU UNSUBSCRIBE AS WELL -->

<main class="relative">
<div class="relative text-center text-5xl font-extrabold md:text-7xl">
    <h1 class="">Change how you wake up</h1>
    <p class="absolute inset-0 opacity-40 blur-md">Change how you wake up</p>
</div>
<p class="mt-4 text-center font-extrabold text-[#d2cff0] md:text-xl">
    Change the time you wake up, what days you get called, your time zone, or just pause the calls all together.    
</p>
{#if !formUser}
<form action="?/sendUpdateValidation" method="POST" class="flex justify-center items-center flex-col mt-8">
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
			<p class="font-thin text-red-400">Number not Registered <span><a class="underline underline-offset-2 hover:underline-offset-4 transition-all" href="/">Register Instead?</a></span></p>
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


	{#if formUser}
	<div class="flex flex-col justify-center items-center mt-10">
		<div class="text-4xl py-4">{formUser.phoneNumber}</div>
		<button class="w-60 text-xl p-4 rounded-lg bg-indigo-500 hover:bg-indigo-600">Pause Service</button>
		<p class="text-sm">resume at any time</p>
		<div class="text-xl pt-4">Wake Up Time: {formUser.wakeUpTime}
		</div>
		<button class="w-50 p-2 rounded-lg bg-indigo-500 hover:bg-red-500">Unsubscribe</button>
	</div>
		
		
	{/if}
</main>

<!-- Modal black out ! -->
{#if formOutput === 'success' || formOutput === 'validation failure'}
	<div class="-z-1 absolute inset-0 h-screen w-screen overflow-hidden bg-neutral-900 opacity-90" />
{/if}
