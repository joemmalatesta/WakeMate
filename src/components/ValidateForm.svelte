<script lang="ts">
    export let formOutput: any;
</script>

<form class="flex flex-col justify-center items-center p-5" method="POST" action="?/validate">
	<h6 class="text-2xl font-semibold">Validate Your Number</h6>
	<input type="text" name="code" class="text-lg rounded-md text-black p-1"/>
    <p class="text-sm">Enter the code from the message</p>
    <button class="p-2 outline">Submit</button>
    {#if formOutput === "validation success"}
        <p class="text-red-500 font-thin"></p>
    {/if}
</form>
