<script lang="ts" context="module">
	import '../app.css'
</script>

<svelte:head>
	<title>Svelte Headless UI</title>
</svelte:head>

<nav class="p-8">
	<a href="/">Home</a>
	<a href="/listbox">Listbox</a>
	<a href="/menu">Menu</a>
	<a href="/switch">Switch</a>
</nav>

<main class="p-8 relative"><slot /></main>
