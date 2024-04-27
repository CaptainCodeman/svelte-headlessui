<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="flex h-full w-full flex-col items-center {$page.data.classes}">
	<slot></slot>
</div>
