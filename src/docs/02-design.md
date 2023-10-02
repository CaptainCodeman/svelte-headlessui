---
title: Design Approach
description: Design Approach of Svelte-HeadlessUI
---

# Design Approach

Background to the design decisions used when creating `svelte-headlessui`

## Why HeadlessUI Components?

Styling components can be a challenge. In an ideal world components are fully encapsulated, including both styling and behavior, but in the real world it's common to want to take a component and customize it's appearance while keeping all of it's behavior (what is often "the complicated part").

There are several approaches to doing this, unfortunatelty most have drawbacks:

### Classes From Parent

The approach people often begin with is passing in classes for a component to use as props. While this is do-able, it has some challenges.

The first is that `class` is a reserved word, so it's not simply a case of exporting a property from your component called `class`. There are a couple of ways around this, first by exporting a different spelling of the name (`clas`, `clazz`) which is unintuitive and slightly grating:

```svelte
<script>
  export let clazz
</script>

<div class={clazz}>
  ...
```

Using an alias to allow `class` to be exported makes it less ugly to consume, but requires some boilerplate be added:

```svelte
<script>
  let clazz
  export { clazz as class }
</script>

<div class={clazz}>
  ...
```

The native `$$props` catch-all can be used directly but is less efficient as it cannot be optimized by Svelte:

```svelte
<div class={$$props.class}>
```

The second is that Svelte is very good at optimizing components and removes unused styles as part of that but it doesn't know that styles defined in one component might be used in another, so to keep those styles they have to be made global using the `:global()` style syntax of Svelte.

Finally, it really only works for the top level container element of a component - there's no way to separately style other elements and sometimes the customization might include setting similar colors for different parts of them - borders, mouseover highlights etc. of multiple elements. You could start adding multiple class properties but really, give up on this as it's a read to nowhere.

If all you want to do is style the top level container of a component, simply wrap it inside a `<div>` and apply the styles you want in the component where you are using it.

### CSS Properties

If you've come from the web-component world you are probably familiar with CSS properties. These allow you to set values in CSS that children elements can use, such as `--my-text-color: red`, which a component could then consume, with:

```css
button {
  color: var(--my-text-color, #333);
}
```

This allows the consumer to customize the syles that the component uses. Unfortunately, you are limited to setting a single CSS property value (or part of one) and if you are using a utility-class based CSS framework such as TailwindCSS then it doesn't really fit in very well. Having an truly flexible API for your component styling might need an unworldly number of properties to be defined in order to be completely flexible, making it unworkable for anything but a few specific customizations.

Fun fact: the original web-component spec did include an `@apply` directive which could work on a complete set of styles for an element - truly flexible. Unfortunately, that was abandoned and there is now a `part()` / `::theme` spec which suffers from all the previous issues and doesn't appear to have gained much traction in the real world - the syntax is ugly and requires that consumers of components know about the internal structure, and that the component author specify which parts allow styling - still restrictive.

Again, save yourself some time from going down these routes as they are dead-ends. Think about the real problem - it's often not simply that you want to apply a few styles, you want to customize the HTML elements that the component renders. The markup for a drop-down component that renders a list of names is going to be very different to one that has avatar images, names, email addresses, and on-line status indicators - what is really needed is the ability to provide the markup while the component provides the behavior.

### Slots

At this point, anyone familiar with Svelte will probably be thinking "Slots! It's slots isn't it? That's going to be the solution ...". Erm, sorry - but no.

Most Web Frameworks have the concept of "slots" which enables composition of components and DOM trees. The host component can define placeholders in it's own markup where the external consumer of the component can pass in content to be included.

Basically, it allows you to wrap some DOM tree with other elements that your component provides. You're usually not limited to a single slot either - you can have multiple, named, slots and the placeholders can have their own default content if none is passed in.

While these slots are fantastic for composing content as wrappers such as creating a "card" component where the image, title and text are passed in, they can become a little clumsy to use when implementing behaviors.

The typical approach is to create extra components that act as wrappers for all the parts of the UI component being implemented, so that these pieces can be coordinated behind the scenes. But I think this adds bloat to the component definitions and is also inefficient.

### HeadlessUI Approach

Hopefully, by now, you will realize the fundamental problem: no component can ever provide the flexibility we need, because it can't posssibly know what markup _we_ want to use. While slots appear to be the solution to that, the reality is that it's harder for a component to make sense of our markup than it would be for our markup to make sense of a component.

What do I mean by that? Well, instead of trying to style the HTML that a component provides OR have the component somehow magically interpret our markup, what if we told it what role the different parts of our markup had?

Svelte provides this in a wonderfully elegant way with element directives or [actions](https://svelte.dev/docs#template-syntax-element-directives-use-action). These are perfect for attaching behavior to an element and allow us to use whatever markup we want, styled however we want, with any runtime accessibility and keyboard handling provided for us.

Behind the scenes, these behaviors handle UI events and setting appropriate WAI-ARIA attributes.

## General Pattern

Components all work the same way ...

A factory method is called to create a component instance. Options can be passed to this method.

The factory method creates an internal store to manage the state of the component and defines methods to mutate that store. When possible, these methods are shared and imported for re-usability.

The public state from the internal store is created using a derived store and is returned along with any custom store methods. These will typically be Svelte `use:action` functions that attach behaviors to DOM elements.

These behaviors are again imported for re-usability whenever possible and they typically follow a pattern of subscribing to the internal store and updating DOM attributes as appropriate to provide WAI-ARIA support or attaching DOM event listeners on the Node to mutate the state. i.e. they are a two-way bridge between the DOM and the internal state store. Some are simple one-time setters to define attributes in a re-usable way.

Overall, the re-use of store methods and behaviors reduces the size of the components.

The state store and `use:action` methods makes it easy to build up a rich UI component with whatever DOM elements and styling are required, while ensuring WAI-ARIA support.
