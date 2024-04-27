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
		y="8"
		width="10"
		height="8"
		stroke-width="2"
		fill={active ? '#8B5CF6' : '#EDE9FE'}
		stroke={active ? '#C4B5FD' : '#A78BFA'}
	/><rect
		x="4"
		y="4"
		width="12"
		height="4"
		stroke-width="2"
		fill={active ? '#8B5CF6' : '#EDE9FE'}
		stroke={active ? '#C4B5FD' : '#A78BFA'}
	/><path d="M8 12H12" stroke-width="2" stroke={active ? '#A78BFA' : '#A78BFA'} /></svg
>
