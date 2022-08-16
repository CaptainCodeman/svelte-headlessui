# Svelte Headless-UI

Unofficial [HeadlessUI](https://headlessui.com/) inspired components for Svelte

## What is this?

A set of [`use:action` directives])(https://svelte.dev/docs#template-syntax-element-directives-use-action) for Svelte that make it easier to create rich, ARIA accessible components. If you want to port [TailwindUI](https://tailwindui.com/) components or other HTML sources to Svelte this may be for you.

Rather than using slotted components, you are in complete control of providing the DOM and styling, and the `use:action` directives provide the behavior and ARIA attribute handling.

I believe this approach results in a smaller, simpler library.

## Components

I hope to implement _all_ the HeadlessUI components, and whatever other [ARIA Patterns](https://www.w3.org/WAI/ARIA/apg/) I find useful.

- [x] Toggle (Button)
- [-] Menu (DropDown)
- [ ] Listbox (Select)
- [ ] Combobox (Autocomplete)
- [-] Switch (Toggle)
- [ ] Disclosure
- [ ] Dialog (Modal)
- [ ] Popover
- [ ] Radio Group
- [ ] Tabs
- [x] Transition: see [svelte-transition](https://www.npmjs.com/package/svelte-transition)

## Alternatives

There is an existing project, [@rgossiaux/svelte-headlessui](https://svelte-headlessui.goss.io), that provides "a complete, full-featured, unofficial Svelte port of Headless UI, an unstyled, fully accessible UI component library" that aligns more closely with the [Offical Tailwind HeadlessUI](https://headlessui.com/) React and Vue packages.

Rather than allowing a legacy web framework to dictate the architecture, I wanted to try a different approach that took advantage of features that Svelte provides.
