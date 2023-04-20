<script lang="ts">
	export let formOutput: any;
</script>

<form
	class="flex flex-col justify-center items-center text-black"
	method="POST"
	action="?/validate"
>
	<h6 class="text-2xl font-semibold">Text Verification</h6>
	<input
		type="text"
		name="code"
		class="text-lg rounded-md text-black p-1 ring-2 ring-neutral-700/60 m-1"
	/>
	{#if formOutput === 'validation failure'}
		<p class="text-red-500 text-sm">Numbers don't match, try again</p>
	{/if}
	<p class="text-sm">Enter the code from the text we sent</p>
	<button
		class="my-2 p-2 px-5 rounded-3xl bg-violet-600 hover:bg-violet-700 drop-shadow-lg text-white"
		>Submit</button
	>
</form>
