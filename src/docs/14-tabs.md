---
title: Tabs
description: Headless Tabs for Svelte
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/tabs
  title: Tabs
  images:
    - url: /svelte-headlessui/tabs.png
      width: 1440
      height: 758
twitter:
  card: summary_large_image
  site: captaincodeman
  title: Tabs 🚀 Svelte-HeadlessUI
  description: Headless Tabs for Svelte
  image: /svelte-headlessui/tabs.png
---

# Tabs

Easily create accessible, fully customizable tab interfaces, with robust focus management and keyboard navigation support.

<iframe class="w-full h-[378px] rounded-xl border-none" src="./example/tabs"></iframe>
<a href="./example/tabs" target="_blank">
  Open in separate tab
</a>

## Example

```svelte
<script lang="ts">
	import { createTabs } from 'svelte-headlessui'

	interface Post {
		id: number
		title: string
		date: string
		commentCount: number
		shareCount: number
	}

	// prettier-ignore
	const categories: Record<string, Post[]> = {
    Recent: [{
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    }, {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    }],
    Popular: [{
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    }, {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    }],
    Trending: [{
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    }, {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    }],
  }

	const keys = Object.keys(categories)
	const tabs = createTabs({ selected: 'Recent' })
</script>

<div class="w-full max-w-md px-2 py-16 sm:px-0">
	<div use:tabs.list class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
		{#each keys as value}
			{@const active = $tabs.active === value}
			{@const selected = $tabs.selected === value}
			<button
				use:tabs.tab={{ value }}
				class="w-full rounded-lg py-2.5 text-sm leading-5 font-medium ring-white/60 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-hidden {selected
					? 'bg-white text-blue-700 shadow-sm'
					: active
						? 'bg-white/15 text-white'
						: 'text-blue-100 hover:bg-white/15 hover:text-white'}">{value}</button
			>
		{/each}
	</div>
	<div class="mt-2">
		{#each keys as value}
			{@const selected = $tabs.selected === value}
			<div
				use:tabs.panel
				class="rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-hidden {selected
					? 'block'
					: 'hidden'}"
			>
				{#if selected}
					<ul>
						{#each categories[$tabs.selected] as post}
							<li class="relative rounded-md p-3 hover:bg-gray-100">
								<h3 class="text-sm leading-5 font-medium">{post.title}</h3>
								<ul class="mt-1 flex space-x-1 text-xs leading-4 font-normal text-gray-500">
									<li>{post.date}</li>
									<li>&middot;</li>
									<li>{post.commentCount} comments</li>
									<li>&middot;</li>
									<li>{post.shareCount} shares</li>
								</ul>
								<!-- svelte-ignore a11y_invalid_attribute -->
								<!-- svelte-ignore a11y_missing_content -->
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<a
									href="#"
									class="absolute inset-0 rounded-md ring-blue-400 focus:z-10 focus:ring-2 focus:outline-hidden"
								></a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</div>
</div>
```
