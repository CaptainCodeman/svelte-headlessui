<script lang="ts">
	import { createButton } from '$lib/button'

	export let label: string

	const { state, button } = createButton({ label })
</script>

<button use:button>
	{#if $state.pressed}
		pressed
	{:else}
		not pressed
	{/if}
</button>

<pre data-testid="debug">{JSON.stringify($state, null, 2)}</pre>
