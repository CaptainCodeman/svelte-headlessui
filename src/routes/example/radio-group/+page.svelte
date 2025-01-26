<script lang="ts">
	let group = $state('startup')
</script>

{#snippet option(id: string, name: string, cpu: string, ssd: string)}
	<div class="relative">
		<input
			{id}
			class="peer absolute h-0 w-0 opacity-0"
			type="radio"
			bind:group
			name="type"
			value={id}
		/>
		<label
			for={id}
			class="relative flex cursor-pointer rounded-lg bg-white px-5 py-4 shadow-md peer-checked:bg-sky-900/75 peer-checked:text-white peer-focus:ring-2 peer-focus:ring-white/60 peer-focus:ring-offset-2 peer-focus:ring-offset-sky-300 focus:outline-hidden [&_p]:text-gray-900 peer-checked:[&_p]:text-white [&_span]:text-gray-500 peer-checked:[&_span]:text-sky-100"
		>
			<div class="flex w-full items-center justify-between">
				<div class="flex items-center">
					<div class="text-sm">
						<p class="font-medium">{name}</p>
						<span class="inline"
							><span>{cpu}</span>
							<span aria-hidden="true">·</span>
							<span>{ssd}</span></span
						>
					</div>
				</div>
				<div class="shrink-0 text-white">
					<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6">
						<circle cx="12" cy="12" r="12" fill="#fff" opacity="0.2" /><path
							d="M7 13l3 3 7-7"
							stroke="#fff"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			</div>
		</label>
	</div>
{/snippet}

<div class="w-full px-4 py-16">
	<div class="mx-auto w-full max-w-md">
		<fieldset class="flex flex-col space-y-2">
			{@render option('startup', 'Startup', '12GB / 6 CPUs', '160 GB SSD disk')}
			{@render option('business', 'Business', '16GB / 8 CPUs', '512 GB SSD disk')}
			{@render option('enterprise', 'Enterprise', '32GB / 12 CPUs', '1024 GB SSD disk')}
		</fieldset>
	</div>
</div>
