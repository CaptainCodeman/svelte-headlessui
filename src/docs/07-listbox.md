---
title: Listbox (Select)
description: Headless Listbox (Select) for Svelte
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/listbox
  title: Listbox (Select)
  images:
    - url: /svelte-headlessui/listbox.png
      width: 1334
      height: 756
twitter:
  card: summary_large_image
  site: captaincodeman
  title: Listbox (Select) 🚀 Svelte-HeadlessUI
  description: Headless Listbox (Select) for Svelte
  image: /svelte-headlessui/listbox.png
---

# Listbox (Select)

Listboxes are a great foundation for building custom, accessible select menus for your app, complete with robust support for keyboard navigation.

<iframe class="w-full h-[378px] rounded-xl border-none" src="./example/listbox"></iframe>
<a href="./example/listbox" target="_blank">
	Open in separate tab
</a>

## Example

```svelte
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

	function onChange(e: Event) {
		console.log('select', (e as CustomEvent).detail.selected)
	}
</script>

<div class="fixed top-16 w-72">
	<div class="relative mt-1">
		<button
			use:listbox.button
			onchange={onChange}
			class="relative w-full cursor-default rounded-lg bg-white py-2 pr-10 pl-3 text-left text-sm shadow-md focus:outline-hidden focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
		>
			<span class="block truncate">{$listbox.selected.name}</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<Selector class="h-5 w-5 text-gray-400" />
			</span>
		</button>

		<Transition
			show={$listbox.expanded}
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<ul
				use:listbox.items
				class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm ring-1 shadow-lg ring-black/5 focus:outline-hidden"
			>
				{#each people as value, i}
					{@const active = $listbox.active === value}
					{@const selected = $listbox.selected === value}
					<li
						class="relative cursor-default py-2 pr-4 pl-10 select-none {active
							? 'bg-amber-100 text-amber-900'
							: 'text-gray-900'}"
						use:listbox.item={{ value }}
					>
						<span class="block truncate {selected ? 'font-medium' : 'font-normal'}"
							>{value.name}</span
						>
						{#if selected}
							<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
