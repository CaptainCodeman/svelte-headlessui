---
title: Listbox (Multiselect)
description: Headless Listbox (Multiselect) for Svelte
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/listbox-multi
  title: Listbox (Multiselect)
  images:
  -
    url: /svelte-headlessui/listbox-multi.png
    width: 1182
    height: 756
twitter:
  card: summary_large_image
  site: captaincodeman
  title: Listbox (Multiselect) 🚀 Svelte-HeadlessUI
  description: Headless Listbox (Multiselect) for Svelte
  image: /svelte-headlessui/listbox-multi.png
---

# Listbox (Multiselect)

Pass an array to the `selected` property of `createListbox` to trigger multi-select mode

<iframe class="w-full h-[378px] rounded-xl border-none" src="./example/listbox/multi"></iframe>
<a href="./example/listbox/multi" target="_blank">
	Open in separate tab
</a>

### Example

```svelte
<script lang="ts">
	import { createListbox } from 'svelte-headlessui'
	import Transition from 'svelte-transition'
	import Selector from '$icons/Selector.svelte'
	import Check from '$icons/Check.svelte'
	import Deselect from '$icons/Deselect.svelte'

	// prettier-ignore
	const people = [
		{ id: 1, name: 'Wade Cooper' },
		{ id: 2, name: 'Arlene Mccoy' },
		{ id: 3, name: 'Devon Webb' },
		{ id: 4, name: 'Tom Cook' },
		{ id: 5, name: 'Tanya Fox' },
		{ id: 6, name: 'Hellen Schmidt' },
		{ id: 7, name: 'Caroline Schultz' },
		{ id: 8, name: 'Mason Heaney' },
		{ id: 9, name: 'Claudie Smitham' },
		{ id: 10, name: 'Emil Schaefer' },
	]

	const listbox = createListbox({ label: 'Actions', selected: [people[2], people[3]] })

	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail)
	}
</script>

<div class="fixed top-12 w-full max-w-4xl px-4">
	<div class="relative mt-1">
		<span class="inline-block w-full rounded-md shadow-sm">
			<button
				use:listbox.button
				on:select={onSelect}
				class="focus:shadow-outline-orange relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-2 pr-10 text-left transition duration-150 ease-in-out focus:border-orange-300 focus:outline-none text-sm sm:leading-5"
			>
				<div class="flex flex-wrap gap-2">
					{#each $listbox.selected as selected (selected.id) }
					<span class="flex items-center gap-1 rounded bg-orange-50 px-2 py-0.5">
						<span>{selected.name}</span>
						<div use:listbox.deselect={selected}>
							<Deselect />
						</div>
					</span>
					{:else}
					<span class="flex items-center gap-1 rounded px-2 py-0.5">
						Empty
					</span>
					{/each}
				</div>
				<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
					<Selector class="h-5 w-5 text-gray-400" />
				</span>
			</button>
		</span>

		<Transition show={$listbox.expanded} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
			<ul
				use:listbox.items
				class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				{#each people as value (value.id)}
					{@const active = $listbox.active === value}
					{@const selected = $listbox.selected.includes(value)}
					<li
						class="relative cursor-default select-none py-2 pl-4 pr-9 focus:outline-none {active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'}"
						use:listbox.item={{ value }}
					>
						<span class="block truncate {selected ? 'font-semibold' : 'font-normal'}">{value.name}</span>
						{#if selected}
							<span class="absolute inset-y-0 right-0 flex items-center pr-3 text-orange-600">
								<Check class="h-5 w-5" />
							</span>
						{/if}
					</li>
				{/each}
			</ul>
		</Transition>
	</div>
</div>

```