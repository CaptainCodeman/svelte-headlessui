<script lang="ts">
	import { createListbox } from 'svelte-headlessui'
	import Transition from 'svelte-transition'
	import Selector from '$icons/Selector.svelte'
	import Check from '$icons/Check.svelte'
	import { onMount } from 'svelte'

	// prettier-ignore
	const people = [
		{ name: 'Wade Cooper' },
		{ name: 'Arlene Mccoy' },
		{ name: 'Devon Webb' },
		{ name: 'Tom Cook' },
		{ name: 'Tanya Fox' },
		{ name: 'Hellen Schmidt' },
	]

	// TODO: type list so 'selected' isn't 'any'
	const listbox = createListbox({ label: 'Actions', selected: people[2] })
	onMount(listbox.open)

	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail.selected)
	}
</script>

<div class="fixed top-16 w-72">
	<div class="relative mt-1">
		<button
			use:listbox.button
			on:select={onSelect}
			class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm"
		>
			<span class="block truncate">{$listbox.selected.name}</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<Selector class="h-5 w-5 text-gray-400" />
			</span>
		</button>

		<Transition show={$listbox.expanded} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
			<ul
				use:listbox.items
				class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				{#each people as value, i}
					<li
						class="relative cursor-default select-none py-2 pl-10 pr-4 font-normal aria-selected:font-medium text-gray-900 focus:outline-none focus:bg-amber-100 focus:text-amber-900 group"
						use:listbox.item={{ value }}
					>
						<span class="block truncate">{value.name}</span>
							<span class="absolute invisible group-aria-selected:visible inset-y-0 left-0 flex items-center pl-3 text-amber-600">
								<Check class="h-5 w-5" />
							</span>
					</li>
				{/each}
			</ul>
		</Transition>
	</div>
</div>
