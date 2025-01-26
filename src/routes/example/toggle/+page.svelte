<script lang="ts">
	import { createSwitch } from 'svelte-headlessui'

	const sw = createSwitch({ label: 'Set Preference' })
</script>

<button
	class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-teal-700 transition-colors duration-200 ease-in-out focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white/75"
	use:sw.toggle
>
	<span class="sr-only">Use setting</span>
	<span
		aria-hidden="true"
		class="{$sw.checked
			? 'translate-x-9'
			: 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out"
	></span>
</button>
