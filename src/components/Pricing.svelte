<script>
	let pricingOptions = [
		{
			type: 'Trial',
            numbers: 1,
			price: 'Free',
			calls: 1,
			texts: "❌"
		},
		{
			type: 'Basic',
            numbers: 1,
			price: '$5/mo',
			calls: 1,
			texts: 1
		},
		{
			type: 'Pro',
            numbers: 1,
			price: '$10/mo',
			calls: 'Up to 3',
			texts: 3
		},
        {
			type: 'Family',
            numbers: "Up to 5",
			price: '$25/mo',
			calls: 'Up to 3',
			texts: 3
		}
        
	];
</script>

<div class="flex justify-around md:flex-row flex-col items-center">
	{#each pricingOptions as option}
		<div class="p-5 flex flex-col outline rounded-lg w-80 bg-indigo-100/5 text-lg my-3">
			<h5 class="text-2xl font-bold text-center">{option.type} - {option.price}</h5>
			<ul class="flex flex-col mx-2">
                <div class="flex justify-between items-center my-1">
					<p>Numbers</p>
					<p>{option.numbers}</p>
				</div>
				<div class="flex justify-between items-center my-1">
					<p>Wake up call</p>
					<p>{option.calls}</p>
				</div>
				<div class="flex justify-between items-center my-1">
					<p>Daily texts</p>
					<p>{option.texts}</p>
				</div>
			</ul>
			<button class="w-full bg-indigo-300 hover:bg-indigo-400 p-2 rounded-lg text-black">Purchase</button>
		</div>
	{/each}
</div>
