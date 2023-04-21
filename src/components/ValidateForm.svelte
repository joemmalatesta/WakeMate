<script lang="ts">
	export let formOutput: any;
</script>

<form
	class="flex flex-col justify-center items-center text-black"
	method="POST"
	action="?/validate"
>
	<h6 class="text-2xl font-semibold">Text Verification</h6>
	<p class="text-sm">Enter the code from the text we sent</p>
	<div class="flex items-center">
	<input
		type="text"
		name="code"
		class="text-lg rounded-l-xl text-black p-2 ring-neutral-800/60 my-1 h-fit"
	/>
	<button
		class="text-lg my-2 p-2 px-5 rounded-r-xl bg-neutral-800 hover:bg-neutral-900 drop-shadow-lg text-white"
		>Submit</button
	>
</div>
	{#if formOutput === 'validation failure'}
		<p class="text-red-800/80">Numbers don't match, try again</p>
	{/if}
	
	
</form>
