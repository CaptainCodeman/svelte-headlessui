<script lang="ts">
	import { createButton } from '$lib/button'

	export let label: string

	const state = createButton()
</script>

<button use:state.button>
	{label}
</button>

{#if $state.pressed}
	pressed
{:else}
	not pressed
{/if}
