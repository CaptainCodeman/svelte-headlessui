---
title: Menu (Dropdown)
description: Headless Menu (Dropdown) for Svelte
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/menu
  title: Menu (Dropdown)
  images:
  -
    url: /svelte-headlessui/menu.png
    width: 1334
    height: 756
twitter:
  card: summary_large_image
  site: captaincodeman
  title: Menu (Dropdown) 🚀 Svelte-HeadlessUI
  description: Headless Menu (Dropdown) for Svelte
  image: /svelte-headlessui/menu.png
---

# Menu (Dropdown)

Menus offer an easy way to build custom, accessible dropdown components with robust support for keyboard navigation.

<iframe class="w-full h-[378px] rounded-xl border-none" src="./example/menu"></iframe>
<a href="./example/menu" target="_blank">
	Open in separate tab
</a>

## Example

```svelte
<script lang="ts">
	import { createMenu } from 'svelte-headlessui'
	import Transition from 'svelte-transition'
	import Archive from './Archive.svelte'
	import ChevronDown from './ChevronDown.svelte'
	import Delete from './Delete.svelte'
	import Duplicate from './Duplicate.svelte'
	import Edit from './Edit.svelte'
	import Move from './Move.svelte'

	const menu = createMenu({ label: 'Actions' })

	function onSelect(e: Event) {
		console.log('select', (e as CustomEvent).detail)
	}

	// prettier-ignore
	const groups = [
		[
			{ icon: Edit, text: `Edit` },
			{ icon: Duplicate, text: `Duplicate` },
		], [
			{ icon: Archive, text: `Archive` },
			{ icon: Move, text: `Move` },
		], [
			{ icon: Delete, text: `Delete` },
		],
	]
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="relative top-16 w-56 text-right">
		<div class="relative inline-block text-left">
			<button
				use:menu.button
				on:select={onSelect}
				class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			>
				Options
				<ChevronDown class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" />
			</button>

			<Transition
				show={$menu.expanded}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<div
					use:menu.items
					class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					{#each groups as group}
						<div class="px-1 py-1">
							{#each group as option}
								{@const active = $menu.active === option.text}
								<button
									use:menu.item
									class="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 focus:outline-none focus:bg-violet-500 focus:text-white"
								>
									<svelte:component this={option.icon} class="w-5 h-5 mr-2" {active} />
									{option.text}
								</button>
							{/each}
						</div>
					{/each}
				</div>
			</Transition>
		</div>
	</div>
</div>
```
