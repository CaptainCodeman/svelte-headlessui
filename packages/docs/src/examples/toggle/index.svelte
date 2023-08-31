<script lang="ts">
	import { createSwitch } from 'svelte-headlessui'

	const sw = createSwitch({ label: 'Set Preference' })
</script>

<div class="py-16 flex w-full flex-col items-center justify-center">
	<button
		class="bg-teal-700 relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		use:sw.toggle
	>
	<span class="sr-only">Use setting</span>
	<span aria-hidden="true" class="{$sw.checked ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
	/>
	</button>
</div>