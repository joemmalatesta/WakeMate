<script>
	let pricingOptions = [
		{
			type: 'Trial',
			price: '$0',
			calls: 1,
			texts: false
		},
		{
			type: 'Basic',
			price: '$5',
			calls: 1,
			texts: 1
		},
		{
			type: 'Pro',
			price: '$10',
			calls: 'Up to 3',
			texts: 1
		}
	];
</script>

<div class="flex justify-around">
	{#each pricingOptions as option}
		<div class="p-5 flex flex-col outline rounded-lg w-80">
			<h5 class="text-2xl font-bold text-center">{option.type}</h5>
			<ul class="flex flex-col mx-2">
				<div class="flex justify-between items-center">
					<li>Calls: {option.calls}</li>
					<img src="/sun.svg" alt="" />
				</div>
				<div class="flex justify-between items-center">
					<li>Texts: {option.texts}</li>
					<img src="/sun.svg" alt="" />
				</div>
				<div class="flex justify-between items-center">
					<li>Price: {option.price}/mo</li>
					<img src="/sun.svg" alt="" />
				</div>
			</ul>
			<button class="w-full bg-indigo-300 hover:bg-indigo-400 p-2 rounded-lg text-black">Purchase</button>
		</div>
	{/each}
</div>
