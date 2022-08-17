<div class="relative mt-8 mb-12 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-300 to-orange-500">
	<div class="absolute inset-x-0 top-0 z-10 m-[2px] md:left-auto">
		<div class=" flex items-stretch justify-end rounded-t-[10px] px-2 py-1 md:m-1 md:rounded-lg">
			<button
				class="bg-black bg-opacity-20 mr-1 flex rounded-md px-3 py-2 text-xs font-medium text-white  focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50 "
				>Preview</button
			><button
				class="bg-black bg-opacity-0 hover:bg-opacity-[0.05] flex rounded-md px-3 py-2 text-xs font-medium text-white   focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50"
				>Code</button
			>
			<div class="my-2 mx-1 w-[2px] grow-0 bg-black bg-opacity-10" />
			<button
				class="bg-black bg-opacity-0 hover:bg-opacity-[0.05] relative rounded-md px-4 py-2 text-xs font-medium text-white  focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50"
				><span class="">Copy</span><span class="opacity-0 absolute inset-0 flex items-center justify-center">Copied!</span></button
			>
		</div>
	</div>
	<div class="w-full h-[378px]">
		<div class="absolute inset-0">
			<div class="h-full w-full">
				<slot />
			</div>
		</div>
	</div>
</div>
