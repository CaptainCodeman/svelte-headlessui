<script>
	import '../app.css'
</script>

<svelte:head>
	<title>Svelte Headless UI</title>
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/menu">Menu</a>
	<a href="/listbox">Listbox</a>
</nav>
<main class="p-8"><slot /></main>
