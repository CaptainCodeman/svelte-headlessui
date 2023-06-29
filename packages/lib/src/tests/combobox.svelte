<script lang="ts">
	import {createCombobox} from '$lib/combobox'

	const combobox = createCombobox()

	// prettier-ignore
	const people = [
		{ name: 'Wade Cooper' },
		{ name: 'Arlene Mccoy' },
		{ name: 'Devon Webb' },
		{ name: 'Tom Cook' },
		{ name: 'Tanya Fox' },
		{ name: 'Hellen Schmidt' },
	]

	$: filtered = people.filter(person => person.name.toLowerCase().replace(/\s+/g, '').includes($combobox.filter.toLowerCase().replace(/\s+/g, '')))
</script>

<div>
	<label>
		My Combobox
		<input
			use:combobox.input
			value={$combobox.selected?.name ?? ''}
		/>
	</label>
	<button use:combobox.button />
</div>

<ul
	use:combobox.items
	class:hidden={!$combobox.expanded}
	>
	{#each filtered as value (value.name)}
		<li use:combobox.item={{value}}>
			{value.name}
		</li>
	{/each}
</ul>

<style>
	.hidden {
		display: none;
	}
</style>
