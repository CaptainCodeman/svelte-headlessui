<script lang="ts">
	export let active: boolean
</script>

<svg
	class={$$props.class}
	aria-hidden="true"
	viewBox="0 0 20 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	><path d="M10 4H16V10" stroke-width="2" stroke={active ? '#C4B5FD' : '#A78BFA'} /><path
		d="M16 4L8 12"
		stroke-width="2"
		stroke={active ? '#C4B5FD' : '#A78BFA'}
	/><path d="M8 6H4V16H14V12" stroke-width="2" stroke={active ? '#C4B5FD' : '#A78BFA'} /></svg
>
