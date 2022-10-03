<script lang="ts">
	import { createDisclosure } from 'svelte-headlessui'
	import ChevronUp from './ChevronUp.svelte'

	const refund = createDisclosure({ label: 'Refund Policy', expanded: true })
	const support = createDisclosure({ label: 'Technical Support', expanded: true })
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="w-full px-4 pt-16">
		<div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
			<div>
				<button
					use:refund.button
					class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
				>
					<span>What is your refund policy?</span>
					<ChevronUp class="h-5 w-5 text-purple-500 {$refund.expanded ? 'rotate-180 transform' : ''}" />
				</button>
				{#if $refund.expanded}
					<div use:refund.panel class="px-4 pt-4 pb-2 text-sm text-gray-500">
						If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.
					</div>
				{/if}
			</div>
			<div class="mt-2">
				<button
					use:support.button
					class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
				>
					<span>Do you offer technical support?</span>
					<ChevronUp class="h-5 w-5 text-purple-500 {$support.expanded ? 'rotate-180 transform' : ''}" />
				</button>
				{#if $support.expanded}
					<div use:support.panel class="px-4 pt-4 pb-2 text-sm text-gray-500">No.</div>
				{/if}
			</div>
		</div>
	</div>
</div>
