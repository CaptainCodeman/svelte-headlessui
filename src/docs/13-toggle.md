---
title: Switch (Toggle)
description: Headless Switch (Toggle) for Svelte
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/toggle
  title: Switch (Toggle)
  images:
    - url: /svelte-headlessui/toggle.png
      width: 1440
      height: 340
twitter:
  card: summary_large_image
  site: captaincodeman
  title: Switch (Toggle) 🚀 Svelte-HeadlessUI
  description: Headless Switch (Toggle) for Svelte
  image: /svelte-headlessui/toggle.png
---

# Switch (Toggle)

Toggle switches are a pleasant interface for toggling a value between two states, and offer the same semantics and keyboard navigation as native checkbox elements.

<iframe class="w-full h-[170px] rounded-xl border-none" src="./example/toggle"></iframe>
<a href="./example/toggle" target="_blank">
	Open in separate tab
</a>

## Example

```svelte
<script lang="ts">
  import { createSwitch } from 'svelte-headlessui'

  const sw = createSwitch({ label: 'Set Preference' })
</script>

<div class="flex w-full flex-col items-center justify-center py-16">
  <button
    class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-teal-700 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    use:sw.toggle
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="{$sw.checked
        ? 'translate-x-9'
        : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
    />
  </button>
</div>
```
