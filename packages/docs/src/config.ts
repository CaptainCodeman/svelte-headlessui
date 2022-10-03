export const SITE = {
	title: 'Svelte-HeadlessUI',
	description: 'HeadlessUI Components for Svelte',
	defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true',
		alt:
			'astro logo on a starry expanse of space,' +
			' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};

export const KNOWN_LANGUAGES = {
	English: 'en',
};

// Uncomment this to add an "Edit this page" button to every page of documentation.
// export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/blob/main/docs/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   appId: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
	en: [
		{ text: 'Home', link: 'en/home' },
		{ text: 'Design Approach', link: 'en/design' },
		{ text: 'Combobox (Autocomplete)', link: 'en/combobox' },
		{ text: 'Dialog (Modal)', link: 'en/dialog' },
		{ text: 'Disclosure', link: 'en/disclosure' },
		{ text: 'Listbox (Select)', link: 'en/listbox' },
		{ text: 'Menu (Dropdown)', link: 'en/menu' },
		{ text: 'Popover', link: 'en/popover' },
		{ text: 'Radio Group', link: 'en/radio-group' },
		{ text: 'Switch (Button)', link: 'en/button' },
		{ text: 'Switch (Toggle)', link: 'en/switch' },
		{ text: 'Tabs', link: 'en/tabs' },
		{ text: 'Transition', link: 'en/transition' },
	],
};
