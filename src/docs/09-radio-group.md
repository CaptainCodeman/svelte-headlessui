---
title: Radio Group
description: Headless Radio Group for Svelte
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/radio-group
  title: Radio Group
  images:
  -
    url: /svelte-headlessui/radio-group.png
    width: 1334
    height: 720
---

# Radio Group

Radio Groups give you the same functionality as native HTML radio inputs, without any of the styling. They're perfect for building out custom UIs for selectors.

<iframe class="w-full h-[360px] rounded-xl border-none" src="./example/radio-group"></iframe>
<a href="./example/radio-group" target="_blank">
	Open in separate tab
</a>

## Note

Svelte provides a [group bind option](https://svelte.dev/docs#template-syntax-element-directives-bind-group) that provides radio-button group functionality out-of-the-box. Combined with some CSS wizardry to hide the inputs and style the labels, we can achieve the nicely styled radio-group input without needing any additional components or code. By re-using the standard `input[type=radio]` functionality we keep the WAI-ARIA behavior and keyboard handling that the browser already provides.

You would probably split each "option" into a separate component to reduce the complexity and repetition of the CSS classes.

## Example

```svelte
<script lang="ts">
	let group = 'startup'
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="w-full px-4 py-16">
		<div class="mx-auto w-full max-w-md">
			<fieldset class="flex flex-col space-y-2">
				<div class="relative">
					<input id="startup" class="absolute opacity-0 w-0 h-0 peer" type="radio" bind:group name="type" value="startup" />
					<label
						for="startup"
						class="[&_p]:text-gray-900 [&_span]:text-gray-500 peer-checked:[&_p]:text-white peer-checked:[&_span]:text-sky-100 peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-opacity-60 peer-focus:ring-offset-2 peer-focus:ring-offset-sky-300 bg-white relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none peer-checked:bg-sky-900/75 peer-checked:text-white"
					>
						<div class="flex w-full items-center justify-between">
							<div class="flex items-center">
								<div class="text-sm">
									<p class="font-medium" id="headlessui-label-:R5mm:">Startup</p>
									<span class="inline" id="headlessui-description-:R9mm:"
										><span>12GB / 6 CPUs</span> <span aria-hidden="true">·</span> <span>160 GB SSD disk</span></span
									>
								</div>
							</div>
							<div class="shrink-0 text-white">
								<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6">
									<circle cx="12" cy="12" r="12" fill="#fff" opacity="0.2" /><path
										d="M7 13l3 3 7-7"
										stroke="#fff"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>
					</label>
				</div>
				<div class="relative">
					<input id="business" class="absolute opacity-0 w-0 h-0 peer" type="radio" bind:group name="type" value="business" />
					<label
						for="business"
						class="[&_p]:text-gray-900 [&_span]:text-gray-500 peer-checked:[&_p]:text-white peer-checked:[&_span]:text-sky-100 peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-opacity-60 peer-focus:ring-offset-2 peer-focus:ring-offset-sky-300 bg-white relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none peer-checked:bg-sky-900/75 peer-checked:text-white"
					>
						<div class="flex w-full items-center justify-between">
							<div class="flex items-center">
								<div class="text-sm">
									<p class="font-medium" id="headlessui-label-:R5qm:">Business</p>
									<span class="inline" id="headlessui-description-:R9qm:"
										><span>16GB / 8 CPUs</span> <span aria-hidden="true">·</span> <span>512 GB SSD disk</span></span
									>
								</div>
							</div>
							<div class="shrink-0 text-white">
								<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6">
									<circle cx="12" cy="12" r="12" fill="#fff" opacity="0.2" /><path
										d="M7 13l3 3 7-7"
										stroke="#fff"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>
					</label>
				</div>
				<div class="relative">
					<input id="enterprise" class="absolute opacity-0 w-0 h-0 peer" type="radio" bind:group name="type" value="enterprise" />
					<label
						for="enterprise"
						class="[&_p]:text-gray-900 [&_span]:text-gray-500 peer-checked:[&_p]:text-white peer-checked:[&_span]:text-sky-100 peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-opacity-60 peer-focus:ring-offset-2 peer-focus:ring-offset-sky-300 bg-white relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none peer-checked:bg-sky-900/75 peer-checked:text-white"
					>
						<div class="flex w-full items-center justify-between">
							<div class="flex items-center">
								<div class="text-sm">
									<p class="font-medium" id="headlessui-label-:R5um:">Enterprise</p>
									<span class="inline" id="headlessui-description-:R9um:"
										><span>32GB / 12 CPUs</span> <span aria-hidden="true">·</span> <span>1024 GB SSD disk</span></span
									>
								</div>
							</div>
							<div class="shrink-0 text-white">
								<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6">
									<circle cx="12" cy="12" r="12" fill="#fff" opacity="0.2" /><path
										d="M7 13l3 3 7-7"
										stroke="#fff"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>
					</label>
				</div>
			</fieldset>
		</div>
	</div>
</div>
```
