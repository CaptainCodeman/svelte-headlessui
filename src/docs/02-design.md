---
title: Design Approach
description: Design Approach of Svelte-HeadlessUI
---

# Design Approach

Most Web Frameworks have the concept of "slots" which enables composition of components and DOM trees. The host component can define placeholders in it's own markup where the external consumer of the component can pass in content to be included.

Basically, it allows you to wrap some DOM tree with other elements that your component provides. You're usually not limited to a single slot either - you can have multiple, named, slots and the placeholders can have their own default content if none is passed in.

While these slots are fantastic for composing content as wrappers such as creating a "card" component where the image, title and text are passed in, they can become a little clumsy to use when implementing behaviors.

The typical approach is to create extra components that act as wrappers for all the parts of the UI component being implemented, so that these pieces can be coordinated behind the scenes. But I think this adds bloat to the component definitions and is also inefficient.

So, instead of using slots, I took advantage of Svelte's `use:action` directive to attach the necessary behaviors to the elements that _you_ define, and a Svelte store is provided to communicate reactivity to your elements - when to hide, what to filer and so on.

Behind the scenes, the behaviors handle UI events and setting appropriate WAI-ARIA attributes.

## General Pattern

Components all work the same way ...

A factory method is called to create a component instance. Options can be passed to this method.

The factory method creates an internal store to manage the state of the component and defines methods to mutate that store. When possible, these methods are shared and imported for re-usability.

The public state from the internal store is created using a derived store and is returned along with any custom store methods. These will typically be Svelte `use:action` functions that attach behaviors to DOM elements.

These behaviors are again imported for re-usability whenever possible and they typically follow a pattern of subscribing to the internal store and updating DOM attributes as appropriate to provide WAI-ARIA support or attaching DOM event listeners on the Node to mutate the state. i.e. they are a two-way bridge between the DOM and the internal state store. Some are simple one-time setters to define attributes in a re-usable way.

Overall, the re-use of store methods and behaviors reduces the size of the components.

The state store and `use:action` methods makes it easy to build up a rich UI component with whatever DOM elements and styling are required, while ensuring WAI-ARIA support.
