<script lang="ts">
	import { createMenu } from '$lib/menu'

	const menu = createMenu({ label: 'Test' })

	const options = ['One', 'Two', 'Three', 'Four', 'Five']
</script>

<div>
	<button use:menu.button> Options</button>
	{#if $menu.expanded}
		<ul use:menu.items>
			{#each options as option, i}
				{@const active = $menu.active === i}
				<li class:active use:menu.item={{ disabled: i === 2 }}>
					{option}
					{active ? '<' : ' '}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<pre data-testid="debug">{JSON.stringify($menu, null, 2)}</pre>
