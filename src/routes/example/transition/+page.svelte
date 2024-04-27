<script lang="ts">
	import Transition from 'svelte-transition'

	export let show = true

	function resetIsShowing() {
		show = false
		setTimeout(() => (show = true), 500)
	}
</script>

<div class="h-32 w-32">
	<Transition
		{show}
		appear
		enter="duration-[400ms]"
		enterFrom="opacity-0 rotate-[-120deg] scale-50"
		enterTo="opacity-100 rotate-0 scale-100"
		leave="duration-200 transition ease-in-out"
		leaveFrom="opacity-100 rotate-0 scale-100"
		leaveTo="opacity-0 scale-95"
	>
		<div class="h-full w-full rounded-md bg-white shadow-lg" />
	</Transition>
</div>
<button
	on:click={resetIsShowing}
	disabled={!show}
	class="mt-8 flex transform items-center rounded-full bg-black bg-opacity-20 px-3 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-opacity-30 focus:outline-none active:bg-opacity-40"
>
	<svg viewBox="0 0 20 20" fill="none" class="h-5 w-5 opacity-70">
		<path
			d="M14.9497 14.9498C12.2161 17.6835 7.78392 17.6835 5.05025 14.9498C2.31658 12.2162 2.31658 7.784 5.05025 5.05033C7.78392 2.31666 12.2161 2.31666 14.9497 5.05033C15.5333 5.63385 15.9922 6.29475 16.3266 7M16.9497 2L17 7H16.3266M12 7L16.3266 7"
			stroke="currentColor"
			stroke-width="1.5"
		/>
	</svg>

	<span class="ml-3">Click to transition</span>
</button>
