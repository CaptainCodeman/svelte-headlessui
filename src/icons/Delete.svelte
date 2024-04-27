<script lang="ts">
	export let active: boolean
</script>

<svg
	class={$$props.class}
	aria-hidden="true"
	viewBox="0 0 20 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	><rect
		x="5"
		y="6"
		width="10"
		height="10"
		stroke-width="2"
		fill={active ? '#8B5CF6' : '#EDE9FE'}
		stroke={active ? '#C4B5FD' : '#A78BFA'}
	/><path d="M3 6H17" stroke-width="2" stroke={active ? '#C4B5FD' : '#A78BFA'} /><path
		d="M8 6V4H12V6"
		stroke-width="2"
		stroke={active ? '#C4B5FD' : '#A78BFA'}
	/></svg
>
