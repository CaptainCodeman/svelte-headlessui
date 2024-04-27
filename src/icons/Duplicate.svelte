<script lang="ts">
	export let active: boolean
</script>

<svg
	class={$$props.class}
	aria-hidden="true"
	viewBox="0 0 20 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	><path
		d="M4 4H12V12H4V4Z"
		stroke-width="2"
		fill={active ? '#8B5CF6' : '#EDE9FE'}
		stroke={active ? '#C4B5FD' : '#A78BFA'}
	/><path
		d="M8 8H16V16H8V8Z"
		stroke-width="2"
		fill={active ? '#8B5CF6' : '#EDE9FE'}
		stroke={active ? '#C4B5FD' : '#A78BFA'}
	/></svg
>
