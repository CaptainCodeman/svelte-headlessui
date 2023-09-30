---
title: Dialog (Modal)
description: Headless Dialog (Modal) for Svelte
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/dialog
  title: Dialog (Modal)
  images:
  -
    url: /svelte-headlessui/dialog.png
    width: 1334
    height: 756
twitter:
  card: summary_large_image
  site: captaincodeman
  title: Dialog (Modal) 🚀 Svelte-HeadlessUI
  description: Headless Dialog (Modal) for Svelte
  image: /svelte-headlessui/dialog.png
---

# Dialog (Modal)

A fully-managed, renderless dialog component jam-packed with accessibility and keyboard features, perfect for building completely custom modal and dialog windows for your next application.

<iframe class="w-full h-[378px] rounded-xl border-none" src="./example/dialog"></iframe>
<a href="./example/dialog" target="_blank">
	Open in separate tab
</a>

## Example

```svelte
<script lang="ts">
	import { createDialog } from 'svelte-headlessui'
	import Transition from 'svelte-transition'

	const dialog = createDialog({ label: 'Payment Success' })
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="flex w-full flex-col items-center justify-center">
		<div class="fixed inset-0 flex items-center justify-center">
			<button
				type="button"
				class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				on:click={dialog.open}>Open dialog</button
			>
		</div>
	</div>

	<div class="relative z-10">
		<Transition show={$dialog.expanded}>
			<Transition
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div class="fixed inset-0 bg-black bg-opacity-25" on:click={dialog.close} />
			</Transition>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all" use:dialog.modal>
							<h3 class="text-lg font-medium leading-6 text-gray-900">Payment successful</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
								</p>
							</div>

							<div class="mt-4">
								<button
									type="button"
									class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									on:click={dialog.close}
								>
									Got it, thanks!
								</button>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	</div>
</div>
```
