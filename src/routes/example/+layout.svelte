<script lang="ts">
	import { page } from '$app/stores'
	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()
</script>

<div class="flex h-full w-full flex-col items-center {$page.data.classes}">
	{@render children?.()}
</div>
