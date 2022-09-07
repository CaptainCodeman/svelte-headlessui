# Svelte Headless-UI

Ultra-small (<3kb gzipped), unofficial, [HeadlessUI](https://headlessui.com/) inspired components for Svelte.

## What is this?

A set of Svelte [`store`](https://svelte.dev/docs#run-time-svelte-store) and [`use:action` directives])(https://svelte.dev/docs#template-syntax-element-directives-use-action) factories that make it easier to create rich, WIA-ARIA accessible components. If you want to port [TailwindUI](https://tailwindui.com/) components or other HTML sources to Svelte with the minimal added JS payload then this may be for you.

Rather than using slotted components, you are responsible for providing all the DOM and styling, responding to the changing store state as you want, and the `use:action` directives provide the way for the behavior and WIA-ARIA attribute handling to hook into your elements.

I believe this approach results in a smaller, simpler library. The library consists of common "behaviors" re-used by many components which account for under 6kb (uncompressed) with each component then around 1-2kb. Even including _all_ components in your app will only add around 3kb of gzipped JavaScript.

## Docs

Complete docs and examples are coming soon. In the meantime, checkout the dev-mode pages to see how they can be used (/packages/lib/src/routes)

## Components

I hope to implement _all_ the HeadlessUI components, and whatever other [ARIA Patterns](https://www.w3.org/WAI/ARIA/apg/) I find useful.

- [x] Toggle (Button)
- [x] Menu (DropDown)
- [x] Listbox (Select)
- [x] Combobox (Autocomplete)
- [x] Switch (Toggle)
- [x] Disclosure
- [x] Dialog (Modal)
- [x] Popover
- [ ] Radio Group
- [x] Tabs
- [x] Transition: see separate [svelte-transition](https://www.npmjs.com/package/svelte-transition) package

## Alternatives

There is an existing project, [@rgossiaux/svelte-headlessui](https://svelte-headlessui.goss.io), that provides "a complete, full-featured, unofficial Svelte port of Headless UI, an unstyled, fully accessible UI component library" which aligns more closely with the [Offical Tailwind HeadlessUI](https://headlessui.com/) React and Vue packages in it's approach.

Rather than allowing a legacy web framework to dictate the architecture, I wanted to try a "Svelte-first" approach that took advantage of features that Svelte provides.
