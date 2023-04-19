<script lang="ts">
	export let form;
	let times = ["4:00am","4:30am","5:00am","5:30am","6:00am","6:30am","7:00am","7:30am","8:00am","8:30am",]
</script>


<main class="lg:mx-40 mx-4 mt-24">
	<div class="relative text-center md:text-7xl text-5xl font-extrabold">
		<h1 class="">Take back your mornings.</h1>
		<p class="absolute inset-0 blur opacity-40">Take back your mornings.</p>
	</div>
	<p class="text-center md:text-xl font-extrabold mt-4 text-[#d2cff0]">Get a wake up call each morning, giving you motivation for the day ahead</p>



<form method="POST" class="flex justify-center items-center flex-col mt-8">
	<input class="w-full xl:w-1/3 lg:w-3/5 p-3 text-black md:text-2xl text-xl placeholder:text-center rounded-t-lg" type="tel" name="phone" inputmode="numeric" id="phone" placeholder="Your phone number"/>
		<select name="time" class="w-full xl:w-1/3 lg:w-3/5 h-12 p-2 bg-[#786afa]">
			<option class="text-center" value="" disabled selected hidden>Wake up time</option>
			{#each times as  time}
			<option>{time}</option>
				
			{/each}
		</select>

	<button type="submit" class="w-full bg-[#4437b0] p-3 xl:w-1/3 lg:w-3/5 rounded-b-lg md:text-2xl text-xl font-semibold">Wake me up</button>
	{#if form?.output === "time failure"}
		<p class="text-red-400 font-thin">Select wake up time</p>
	{:else if form?.output === "number failure"}
		<p class="text-red-400 font-thin">Enter valid number</p>
	{/if}
</form>
<!-- {#if form?.output}
    <h1 class="">{form?.output}</h1>
{/if} -->
</main>
