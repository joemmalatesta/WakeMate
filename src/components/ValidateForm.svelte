<script lang="ts">
	export let formOutput: any;

	//Put in a function so time is more accurate by running on form submit rather than form load
	function getCurrentTime() {
		const currentTime = new Date().toLocaleString();
		return currentTime
	}
	
</script>

<!-- Modal class used in the app.css to hide overflow when it is active. -->
<form
	class="modal flex flex-col justify-center items-center text-black"
	method="POST"
	action="?/validate"
>
	<h6 class="text-2xl font-semibold">Text Verification</h6>
	<p class="text-sm">Enter the code from the text we sent</p>
	<div class="flex items-center md:flex-row flex-col">
		<!-- Pass users TimeZone with the form. Getting this on the server is no good. -->
		<input type="text" name="timeZone" value={Intl.DateTimeFormat().resolvedOptions().timeZone} class="hidden">
		<input type="text" name="localTime" value={getCurrentTime()} class="hidden">
		<input
			type="text"
			inputmode="numeric"
			name="code"
			class="text-lg md:rounded-l-xl rounded-t text-black p-2 ring-neutral-800/60 md:my-1 mt-1 h-fit"
		/>
		<button
			class="text-lg md:my-2 mb-2 w-full md:w-auto p-2 px-5 md:rounded-r-xl rounded-b bg-neutral-800 hover:bg-neutral-900 drop-shadow-lg text-white"
			>Submit</button
		>
	</div>
	{#if formOutput === 'validation failure'}
		<p class="text-red-800/80">Numbers don't match, try again</p>
	{/if}
</form>
