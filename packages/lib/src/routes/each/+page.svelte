<script lang="ts">
	// with keyed each block:
	// - update is run on blocks not being changed, data is same unless it actually changes

	// with unkeyed each block:
	// - update can re-assign data to a different DOM

	// node content has always been rendered before action update, so textContent is in sync

	// neee to keep node association to data in sync - could set it on DOM object itself

	let items = ['one', 'two', 'three', 'four', 'five']
	let rest = ['six', 'seven', 'eight', 'nine', 'ten']
	let id = 0

	function addFirst() {
		const value = rest.shift()
		if (value) {
			items = [value, ...items]
		}
	}

	function addLast() {
		const value = rest.shift()
		if (value) {
			items = [...items, value]
		}
	}

	function remFirst() {
		items = items.slice(1)
	}

	function remLast() {
		items = items.slice(0, items.length - 1)
	}

	function swap(a: number, b: number) {
		;[items[a], items[b]] = [items[b], items[a]]
		items = items
	}

	function up(i: number) {
		if (i > 0) swap(i, i - 1)
	}

	function dn(i: number) {
		if (i < items.length - 1) swap(i, i + 1)
	}

	function del(i: number) {
		items = items.filter((_value, index) => index !== i)
	}

	// maintain ordered mapping of values based on node position
	// keep ordered list of node IDs (maintain using use:action / mutation observer)
	// keep map of node id to value
	// NOTE: doesn't handle re-ordering of non-keyed items (no mutation observer)
	let view = new Map<string, any>()
	let ids: string[] = []

	function action(node: HTMLElement, value?: any) {
		if (!node.id) {
			node.id = `${++id}`
		}

		let data = value

		console.log('create', node.id, node.textContent, data)
		view.set(node.id, value)
		ids = [...ids, node.id]

		return {
			update(value?: any) {
				console.log('update', node.id, value)
				if (value === data) return
				data = value
				// map.set(node, data)
				console.log('update', node.id, node.textContent, data)
				view.set(node.id, value)
			},

			destroy() {
				// map.delete(node)
				console.log('remove', node.id, node.textContent, data)
				view.delete(node.id)
			},
		}
	}

	function observe(node: HTMLElement) {
		const mo = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				if (mutation.addedNodes.length) {
					for (const node of mutation.addedNodes) {
						const el = node as HTMLElement
						console.log('added', el.id)
						// could have been added by initial render, which doesn't trigger this mutation
						// so we need to remove it to make the behavior consistent (it would be added at end)
						const i = ids.indexOf(el.id)
						if (i > -1) {
							ids.splice(i, 1)
						}

						if (mutation.previousSibling) {
							const prev = mutation.previousSibling as HTMLElement
							console.log('after', prev.id)
							const i = ids.indexOf(prev.id)
							ids.splice(i + 1, 0, el.id)
							ids = ids
						} else if (mutation.nextSibling) {
							const next = mutation.nextSibling as HTMLElement
							console.log('before', next.id)
							const i = ids.indexOf(next.id)
							ids.splice(i, 0, el.id)
							ids = ids
						}
					}
				}

				if (mutation.removedNodes.length) {
					for (const node of mutation.removedNodes) {
						const el = node as HTMLElement
						console.log('removed', el.id)
						if (mutation.previousSibling) {
							const prev = mutation.previousSibling as HTMLElement
							console.log('after', prev.id)
							const i = ids.indexOf(prev.id)
							ids.splice(i + 1, 1)
							ids = ids
						} else if (mutation.nextSibling) {
							const next = mutation.nextSibling as HTMLElement
							console.log('before', next.id)
							const i = ids.indexOf(next.id)
							ids.splice(i - 1, 1)
							ids = ids
						} else {
							ids = ids.filter(x => x !== el.id)
						}
					}
				}
			}
		})
		mo.observe(node, { childList: true, subtree: false })
	}
</script>

<button on:click={remFirst}>rem first</button>
<button on:click={addFirst}>add first</button>
<button on:click={addLast}>add last</button>
<button on:click={remLast}>rem last</button>

<hr class="my-4" />

<ul use:observe>
	{#each items as item, i}
		<li use:action={item}>
			<button on:click={() => up(i)}>+</button>
			<button on:click={() => dn(i)}>-</button>
			<button on:click={() => del(i)}>X</button>
			{item}
		</li>
	{/each}
</ul>

<pre class="text-xs">{JSON.stringify(items, null, 2)}</pre>
<pre class="text-xs">{JSON.stringify(ids)}</pre>
<pre class="text-xs">{JSON.stringify(
		ids.map(id => ({ id, value: view.get(id) })),
		null,
		2
	)}</pre>

<blockquote class="mt-4">
	An action can have a parameter. If the returned value has an update method, it will be called whenever that parameter changes, immediately after
	Svelte has applied updates to the markup.
</blockquote>
<a href="https://svelte.dev/docs#template-syntax-element-directives-use-action">use:action</a>

<style>
	button {
		margin: 4px;
		padding: 2px 8px;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
</style>
