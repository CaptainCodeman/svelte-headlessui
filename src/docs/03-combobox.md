---
title: Combobox (Autocomplete)
description: Headless Combobox (Autocomplete) for Svelte
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/combobox
  title: Combobox (Autocomplete)
  images:
  -
    url: /svelte-headlessui/combobox.png
    width: 1334
    height: 756
twitter:
  card: summary_large_image
  site: captaincodeman
  title: Combobox (Autocomplete) 🚀 Svelte-HeadlessUI
  description: Headless Combobox (Autocomplete) for Svelte
  image: /svelte-headlessui/combobox.png
---

# Combobox (Autocomplete)

Comboboxes are the foundation of accessible autocompletes and command palettes for your app, complete with robust support for keyboard navigation.

<iframe class="w-full h-[378px] rounded-xl border-none" src="./example/combobox"></iframe>
<a href="./example/combobox" target="_blank">
	Open in separate tab
</a>

## Example

```svelte
<script lang="ts">
	import { createCombobox } from 'svelte-headlessui'
	import Transition from 'svelte-transition'
	import Selector from './Selector.svelte'
	import Check from './Check.svelte'

	// prettier-ignore
	const people = [
		{ name: 'Wade Cooper' },
		{ name: 'Arlene Mccoy' },
		{ name: 'Devon Webb' },
		{ name: 'Tom Cook' },
		{ name: 'Tanya Fox' },
		{ name: 'Hellen Schmidt' },
	]

	const combobox = createCombobox({ label: 'Actions', selected: people[2] })

	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail)
	}

	$: filtered = people.filter(person => person.name.toLowerCase().replace(/\s+/g, '').includes($combobox.filter.toLowerCase().replace(/\s+/g, '')))
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="fixed top-16 w-72">
		<div class="relative mt-1">
			<div
				class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 text-sm"
			>
				<input
					use:combobox.input
					on:select={onSelect}
					class="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
					value={$combobox.selected.name}
				/>
				<!-- <span class="block truncate">{people[$listbox.selected].name}</span> -->
				<button use:combobox.button class="absolute inset-y-0 right-0 flex items-center pr-2" type="button">
					<Selector class="h-5 w-5 text-gray-400" />
				</button>
			</div>

			<Transition
				show={$combobox.expanded}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				on:after-leave={() => combobox.reset()}
			>
				<ul
					use:combobox.items
					class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					{#each filtered as value}
						{@const active = $combobox.active === value}
						{@const selected = $combobox.selected === value}
						<li
							class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 focus:outline-none focus:bg-teal-600 focus:text-white group"
							use:combobox.item={{ value }}
						>
							<span class="block truncate font-normal group-aria-selected:font-medium">{value.name}</span>
							<span class="absolute invisible group-aria-selected:visible inset-y-0 left-0 flex items-center pl-3 text-teal-600 group-focus:text-white">
								<Check class="h-5 w-5" />
							</span>
						</li>
					{:else}
						<li class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900">
							<span class="block truncate font-normal">Nothing found</span>
						</li>
					{/each}
				</ul>
			</Transition>
		</div>
	</div>
</div>
```
