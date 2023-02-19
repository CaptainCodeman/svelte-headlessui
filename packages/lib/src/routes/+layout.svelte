<script lang="ts" context="module">
	import '../app.css'
</script>

<svelte:head>
	<title>Svelte Headless UI</title>
</svelte:head>

<nav class="p-8">
	<a href="/">Home</a>
	<a href="/button">Button (toggle)</a>
	<a href="/combobox">Combobox</a>
	<a href="/dialog">Dialog</a>
	<a href="/disclosure">Disclosure</a>
	<a href="/listbox">Listbox</a>
	<a href="/menu">Menu</a>
	<a href="/popover">Popover</a>
	<a href="/radio-group">Radio Group</a>
	<a href="/switch">Switch (toggle)</a>
	<a href="/tabs">Tabs</a>
</nav>

<main class="p-8 relative"><slot /></main>
