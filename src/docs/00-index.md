---
title: Svelte-HeadlessUI
description: Introduction to Svelte-HeadlessUI
openGraph:
  type: website
  url: https://captaincodeman.github.io/svelte-headlessui/
  title: Svelte-HeadlessUI
  description: Tailwind HeadlessUI implementation for Svelte
  images:
  -
    url: /svelte-headlessui/menu.png
    width: 1334
    height: 756
twitter:
  card: summary_large_image
  site: captaincodeman
  title: Svelte-HeadlessUI
  description: Tailwind HeadlessUI implementation for Svelte
  image: /svelte-headlessui/menu.png
---

![Svelte-HeadlessUI](./logo.svg)

`svelte-headlessui` is an unofficial implementation of [Tailwind HeadlessUI](https://headlessui.com/) for [Svelte](https://svelte.dev/). Just like the official implementation, they are:

- ✅ Completely unstyled
- ✅ Fully WAI-ARIA accessible UI components
- ✅ Fully typed with Typescript
- ✅ Designed to integrate beautifully with Tailwind CSS

But also:

- ✅ Designed to integrate easily with Svelte and SvelteKit
- ✅ Only 14kB minified / 4kB minified + gzipped

![minified](https://img.shields.io/bundlephobia/min/svelte-headlessui/0.0.28?style=for-the-badge)
![minified zipped](https://img.shields.io/bundlephobia/minzip/svelte-headlessui/0.0.28?style=for-the-badge)

## Installation

Install using your package manager of choice, e.g.

```bash
pnpm install svelte-headlessui
```

Import the appropriate `create...` factory method in your component and use the custom store it returns to manage your component state and attach `use:action` behaviors to your elements.

See the individual component pages for usage examples.

NOTE: Some of the examples use [svelte-transition](https://www.npmjs.com/package/svelte-transition) to apply TailwindCSS animation classes. This is a separate package, not to be confused with the [svelte/transition](https://svelte.dev/docs#run-time-svelte-transition) module built into Svelte itself.

## Alternative

You may be interested in evaluating [@rgossiaux/svelte-headlessui](https://svelte-headlessui.goss.io). This package aligns closer to the official components in it's approach although I believe that approach (driven by React / Vue) contributes to the [10x larger size of 140.1kB minified javascript](https://bundlephobia.com/package/@rgossiaux/svelte-headlessui@2.0.0).

## Logo

Special thanks to [Shoob](https://github.com/hshoob) for the awesome logo!
