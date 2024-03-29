---
title: Switch (Button)
description: Headless Switch (Button) for Svelte
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/button
  title: Switch (Button)
  images:
  -
    url: /svelte-headlessui/button.png
    width: 1440
    height: 340
twitter:
  card: summary_large_image
  site: captaincodeman
  title: Switch (Button) 🚀 Svelte-HeadlessUI
  description: Headless Switch (Button) for Svelte
  image: /svelte-headlessui/button.png
---

# Switch (Button)

Buttons are a pleasant interface for toggling a value between two states, and offer the same semantics and keyboard navigation as native checkbox elements.

<iframe class="w-full h-[170px] rounded-xl border-none" src="./example/button"></iframe>
<a href="./example/button" target="_blank">
	Open in separate tab
</a>

## Example

```svelte
<script lang="ts">
	import { createSwitch } from 'svelte-headlessui'

	const sw = createSwitch({ label: 'Play Music' })
</script>

<div class="py-16 flex w-full flex-col items-center justify-center">
	<button
		class="flex align-middle gap-2 text-white p-2 rounded-md outline-offset-2 {$sw.pressed
			? 'bg-gray-400 hover:bg-gray-500 focus:outline-gray-500'
			: 'bg-green-600 hover:bg-green-700 focus:outline-green-700'}"
		use:sw.button
	>
		{#if $sw.pressed}
			<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span>Pause</span>
		{:else}
			<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
</div>
```
