<script lang="ts">
	import { createSwitch } from 'svelte-headlessui'

	const sw = createSwitch({ label: 'Control Music' })
</script>

<button
	class="flex gap-2 rounded-md p-2 align-middle text-white outline-offset-2 {$sw.pressed
		? 'bg-gray-400 hover:bg-gray-500 focus:outline-gray-500'
		: 'bg-green-600 hover:bg-green-700 focus:outline-green-700'}"
	use:sw.button
>
	{#if $sw.pressed}
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span>Pause</span>
	{:else}
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
			/>
			<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		<span>Play</span>
	{/if}
</button>
