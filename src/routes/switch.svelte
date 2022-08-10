<script lang="ts">
	import { createSwitch } from '$lib/switch'

	const { state, toggleSwitch } = createSwitch({ label: 'Set Preference' })
</script>

<div class="relative mt-8 mb-12 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-green-400 to-cyan-500">
	<div class="w-full h-[170px]">
		<div class="absolute inset-0" />
		<button
			class="bg-teal-700
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
			id="headlessui-switch-:R2:"
			use:toggleSwitch
			><span class="sr-only">Use setting</span><span
				aria-hidden="true"
				class="{$state.checked ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
			/></button
		>
	</div>
</div>
