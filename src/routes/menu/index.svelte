<script lang="ts">
	import { createMenu } from '$lib/menu'
	import Transition from 'svelte-transition'
	import Archive from './_Archive.svelte'
	import ChevronDown from './_ChevronDown.svelte'
	import Delete from './_Delete.svelte'
	import Duplicate from './_Duplicate.svelte'
	import Edit from './_Edit.svelte'
	import Move from './_Move.svelte'

	const { state, button, menu, item } = createMenu({ label: 'Actions' })

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
				use:button
				on:select={onSelect}
				class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			>
				Options
				<ChevronDown class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" />
			</button>

			<Transition
				show={$state.expanded}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<div
					use:menu
					class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					{#each groups as group}
						<div class="px-1 py-1">
							{#each group as option}
								{@const active = $state.value === option.text}
								<button
									class="group flex rounded-md items-center w-full px-2 py-2 text-sm {active ? 'bg-violet-500 text-white' : 'text-gray-900'}"
									use:item
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
