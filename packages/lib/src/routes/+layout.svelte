<script lang="ts" context="module">
	import '../app.css'
</script>

<svelte:head>
	<title>Svelte Headless UI</title>
</svelte:head>

<nav class="p-8">
	<a href="/">Home</a>
	<a href="/button">Switch (Button)</a>
	<a href="/combobox">Combobox</a>
	<a href="/dialog">Dialog</a>
	<a href="/disclosure">Disclosure</a>
	<a href="/listbox">Listbox</a>
	<a href="/menu">Menu</a>
	<a href="/popover">Popover</a>
	<a href="/radio-group">Radio Group</a>
	<a href="/toggle">Switch (Toggle)</a>
	<a href="/tabs">Tabs</a>
</nav>

<main class="p-8 relative"><slot /></main>
