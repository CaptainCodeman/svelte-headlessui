<script lang="ts">
	import { createPopover } from 'svelte-headlessui'
	import ChevronDown from '$icons/ChevronDown.svelte'
	import IconOne from '$icons/IconOne.svelte'
	import IconTwo from '$icons/IconTwo.svelte'
	import IconThree from '$icons/IconThree.svelte'
	import Transition from 'svelte-transition'
	import { onMount } from 'svelte'

	const popover = createPopover({})
	onMount(popover.open)

	// prettier-ignore
	const solutions = [{
		name: 'Insights',
		description: 'Measure actions your users take',
		href: '##',
		icon: IconOne,
	}, {
		name: 'Automations',
		description: 'Create your own targeted content',
		href: '##',
		icon: IconTwo,
	}, {
		name: 'Reports',
		description: 'Keep track of your growth',
		href: '##',
		icon: IconThree,
	}]
</script>

<div class="relative top-16 w-56 text-right">
	<div class="relative inline-block text-left">
		<button
			use:popover.button
			class="{$popover.expanded
				? 'text-white'
				: 'text-white/90'} group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium hover:text-white/100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white/75"
		>
			Solutions
			<ChevronDown
				class="{$popover.expanded
					? 'text-orange-300'
					: 'text-orange-300/70'} group-hover:tetext-orange-300/80 ml-2 h-5 w-5 transition duration-150 ease-in-out"
			/>
		</button>

		<Transition
			show={$popover.expanded}
			enter="transition ease-out duration-200"
			enterFrom="opacity-0 translate-y-1"
			enterTo="opacity-100 translate-y-0"
			leave="transition ease-in duration-150"
			leaveFrom="opacity-100 translate-y-0"
			leaveTo="opacity-0 translate-y-1"
		>
			<div
				use:popover.panel
				class="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
			>
				<div class="overflow-hidden rounded-lg ring-1 shadow-lg ring-black/5">
					<div class="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
						{#each solutions as item}
							<a
								href={item.href}
								class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50"
								onclick={popover.close}
							>
								<div
									class="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12"
								>
									<item.icon class="mr-2 h-5 w-5" />
								</div>
								<div class="ml-4">
									<p class="text-sm font-medium text-gray-900">
										{item.name}
									</p>
									<p class="text-sm text-gray-500">
										{item.description}
									</p>
								</div>
							</a>
						{/each}
					</div>
					<div class="bg-gray-50 p-4">
						<a
							href="##"
							class="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50"
							onclick={popover.close}
						>
							<span class="flex items-center">
								<span class="text-sm font-medium text-gray-900"> Documentation </span>
							</span>
							<span class="block text-sm text-gray-500">
								Start integrating products and tools
							</span>
						</a>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</div>
