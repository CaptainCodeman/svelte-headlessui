<script lang="ts">
	import { onMount } from 'svelte'
	import { createMenu } from 'svelte-headlessui'
	import Transition from 'svelte-transition'
	import Archive from '$icons/Archive.svelte'
	import ChevronDown from '$icons/ChevronDown.svelte'
	import Delete from '$icons/Delete.svelte'
	import Duplicate from '$icons/Duplicate.svelte'
	import Edit from '$icons/Edit.svelte'
	import Move from '$icons/Move.svelte'

	const menu = createMenu({ label: 'Actions' })
	onMount(menu.open)

	function onChange(e: Event) {
		console.log('select', (e as CustomEvent).detail.selected)
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

<div class="relative top-16 w-56 text-right">
	<div class="relative inline-block text-left">
		<button
			use:menu.button
			on:change={onChange}
			class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		>
			Options
			<ChevronDown class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100" />
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
								class="group flex w-full items-center rounded-md px-2 py-2 text-sm {active
									? 'bg-violet-500 text-white'
									: 'text-gray-900'}"
							>
								<svelte:component this={option.icon} class="mr-2 h-5 w-5" {active} />
								{option.text}
							</button>
						{/each}
					</div>
				{/each}
			</div>
		</Transition>
	</div>
</div>
