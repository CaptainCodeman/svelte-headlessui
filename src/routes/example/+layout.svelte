<script lang="ts">
  import { page } from '$app/stores'
</script>

<div class="flex flex-col w-full h-full items-center {$page.data.classes}">
  <slot></slot>
</div>