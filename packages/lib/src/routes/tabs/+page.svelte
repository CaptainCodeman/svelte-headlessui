<script lang="ts">
	import { createTabs } from '$lib/tabs'

  interface Post {
    id: number
    title: string
    date: string
    commentCount: number
    shareCount: number
  }

	// prettier-ignore
	const categories: Record<string, Post[]> = {
    Recent: [{
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    }, {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    }],
    Popular: [{
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    }, {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    }],
    Trending: [{
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    }, {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    }],
  }

  const keys = Object.keys(categories)
	const tabs = createTabs({ selected: 0 })

  $: active_panel = categories[keys[$tabs.selected]]
</script>

<div class="flex w-full flex-col items-center justify-center">
  <div class="w-full max-w-md px-2 py-16 sm:px-0">
    <div use:tabs.list class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
    {#each keys as key}
      {@const selected = key === keys[$tabs.selected]}
      <button use:tabs.tab={key} class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 {selected ? 'text-blue-700 bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}">{key}</button>
    {/each}
    <!--
      <button class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 bg-white shadow" id="headlessui-tabs-tab-1" role="tab" type="button" aria-selected="true" tabindex="0" data-headlessui-state="selected" aria-controls="headlessui-tabs-panel-undefined">Recent</button>
      <button class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white" id="headlessui-tabs-tab-2" role="tab" type="button" aria-selected="false" tabindex="-1" data-headlessui-state="" aria-controls="headlessui-tabs-panel-undefined">Popular</button>
      <button class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-blue-100 hover:bg-white/[0.12] hover:text-white" id="headlessui-tabs-tab-3" role="tab" type="button" aria-selected="false" tabindex="-1" data-headlessui-state="" aria-controls="headlessui-tabs-panel-undefined">Trending</button>
    -->
    </div>
    <div class="mt-2">
      <div use:tabs.panel={keys[$tabs.selected]} class="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2" id="headlessui-tabs-panel-4" role="tabpanel" tabindex="0" data-headlessui-state="selected" aria-labelledby="headlessui-tabs-tab-undefined">
        <ul>
        {#each active_panel as post}
          <li class="relative rounded-md p-3 hover:bg-gray-100">
            <h3 class="text-sm font-medium leading-5">{post.title}</h3>
            <ul class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
              <li>{post.date}</li>
              <li>&middot;</li>
              <li>{post.commentCount} comments</li>
              <li>&middot;</li>
              <li>{post.shareCount} shares</li>
            </ul>
            <a href="#" class="absolute inset-0 rounded-md ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"></a>
          </li>
          {/each}
        </ul>
      </div>
      <span id="headlessui-tabs-panel-5" role="tabpanel" tabindex="-1" style="position:fixed;top:1px;left:1px;width:1px;height:0;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0" aria-labelledby="headlessui-tabs-tab-undefined"></span>
      <span id="headlessui-tabs-panel-6" role="tabpanel" tabindex="-1" style="position:fixed;top:1px;left:1px;width:1px;height:0;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0" aria-labelledby="headlessui-tabs-tab-undefined"></span>
    </div>
  </div>
</div>
