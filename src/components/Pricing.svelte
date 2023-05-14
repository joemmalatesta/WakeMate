<script lang="ts">
	let pricingOptions = [
		{
			id: -1,
			type: 'Trial',
			numbers: 1,
			price: 'Free',
			calls: 1,
			texts: '0',
			buttonText: 'Try for a week'
		},
		{
			id: 0,
			type: 'Basic',
			numbers: 1,
			price: '$5/mo',
			calls: 1,
			texts: 1
		},
		{
			id: 1,
			type: 'Pro',
			numbers: 1,
			price: '$10/mo',
			calls: 'Up to 3',
			texts: 3
		}
		// {
		// 	type: 'Family',
		//     numbers: "Up to 5",
		// 	price: '$25/mo',
		// 	calls: 'Up to 3',
		// 	texts: 3
		// }
	];

	async function purchase(purchaseId: number) {
		if (purchaseId == -1) {
			return;
		}
		try {
			const response = await fetch('/api/purchase', {
				method: 'POST',
				body: JSON.stringify({ purchaseId }),
				headers: {
					'content-type': 'application/json'
				}
			});

			const { url: stripeUrl } = await response.json();
			console.log(stripeUrl);
			window.location.href = stripeUrl;
		} catch (e) {
			console.log(e);
			return;
		}
	}
</script>

<div class="flex justify-around md:flex-row flex-col items-center flex-wrap">
	{#each pricingOptions as option}
		<div
			class="p-5 flex flex-col ring ring-indigo-100/60 shadow-md shadow-white rounded-lg w-80 bg-indigo-100/5 text-lg my-3"
		>
			<h5 class="text-3xl font-bold text-center">{option.type} - {option.price}</h5>
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
			{#if option.id === -1}
				<a
					href="/"
					class="w-full bg-indigo-400 hover:bg-indigo-500 p-2 rounded-lg text-black text-center"
					>{option.buttonText}</a
				>
			{:else}
				<button
					on:click={() => {
						purchase(option.id);
					}}
					class="w-full bg-indigo-400 hover:bg-indigo-500 p-2 rounded-lg text-black"
					>{option.buttonText || 'Purchase'}</button
				>
			{/if}
		</div>
	{/each}
</div>
