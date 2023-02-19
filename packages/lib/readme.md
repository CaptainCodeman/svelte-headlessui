![minified](https://img.shields.io/bundlephobia/min/svelte-headlessui/0.0.15?style=for-the-badge)
![minified + zipped](https://img.shields.io/bundlephobia/minzip/svelte-headlessui/0.0.15?style=for-the-badge)

# Svelte-HeadlessUI

![Svelte Headless-UI](https://raw.githubusercontent.com/CaptainCodeman/svelte-headlessui/8e312a2fc243e811d5d9b50e78457e10f650df49/packages/lib/static/svelte-headlessui-solid-text.svg?sanitize=true)

`svelte-headlessui` is an unofficial implementation of [Tailwind HeadlessUI](https://headlessui.com/) for [Svelte](https://svelte.dev/). Just like the official implementation, they are:

- ✅ Completely unstyled
- ✅ Fully WIA-ARIA accessible UI components
- ✅ Fully typed with Typescript
- ✅ Designed to integrate beautifully with Tailwind CSS

But also:

- ✅ Designed to integrate beautifully with Svelte and SvelteKit
- ✅ Less than 14kB minified / 4kB minified gzipped

## Installation

Install using your package manager of choice, e.g.

    pnpm install svelte-headlessui

Import the appropriate `create...` factory method in your component and use the custom store it returns to manage your component state and attach `use:action` behaviors to your elements.

See the individual component pages for usage examples.

## Alternative

You may be interested in evaluating [@rgossiaux/svelte-headlessui](https://svelte-headlessui.goss.io). This package aligns closer to the official components in it's approach although I believe that approach (driven by React / Vue) contributes to the [larger size of 173kB minified / 29kB minified + gzipped](https://bundlephobia.com/package/@rgossiaux/svelte-headlessui@1.0.2).

## Logo

Special thanks to [Shoob](https://github.com/hshoob) for the logo!
