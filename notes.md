# Architecture

`createWidget` fuctions return a state store and `use:action` directives to apply to elements
`use:action` directives provide DOM references and lifecycle access
aria-attributes and event handlers are managed to provide functionality
state store provides state that elements can respond to for styling
state store actions provide access to control widget

Some behaviors just set something (no unsubscribe)
Some just reflect the state to the DOM
Some respond to events
Some write back to the state (orchestrate things)
All apply to some interface or combination of interfaces
Split state store into internal (e.g. DOM element refs, search prefix) and external (expanded, active, closed, values)
Use derived store for 'complete'
Make it easy to set label or labelled by

initializers / setters

- easy way to define that a node should have certain attributes (type, role, tabindex etc...)
  reflectors
- update DOM attributes based on state (should re-use initializers / setters, initializer is just fixed value?)
  handlers
  behaviors

```ts
const popupSetter = (node: HTMLElement) => (value?: boolean) =>
	value === undefined ? node.removeAttribute('aria-haspopup') : node.setAttribute('aria-haspopup', value.toString())

const popupReflector = (store: Readable<State>) => (setter: (value?: boolean) => void) => store.subscribe(state => setter(state.value))

const clickHandler = (node: HTMLElement) => (store: )
```

## Setters

setters have to be created from the node, they return a function that will reflect a value to the DOM
reflectors have to be created from the store, they return a function that cam be passed a setter, to call when the state changes

## Testing

We can test individual pieces, the setters should update the DOM, then the reflectors should listen to the store and call the setter (mock)
At the component level we test that given certain state, the appropriate attributes are set on the elements and certain UI interactions then mutitate the state (call the custom store functions)

Many of these can be data-driven tests

Finally, some UI snapshots can check for correct rendering

## TODO:

Use spearate list of HTMLElements (if they need to be referenced to set focus etc...), element IDs (for aria-attribute references) and values

handle different DOM ordering of elements ... don't assume button comes before list, etc...
one may be shown / hidden for other reasons, component should react to that as appropriate

Create derived store to hide internals (e.g. DOM element references)

Pattern to test store - should focus on state part as a POJO, with a wrapper to convert it into a subscribable store

## Focus Trap

https://hidde.blog/using-javascript-to-trap-focus-in-an-element/

```js
function trapFocus(element) {
	var focusableEls = element.querySelectorAll(
		'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
	)
	var firstFocusableEl = focusableEls[0]
	var lastFocusableEl = focusableEls[focusableEls.length - 1]
	var KEYCODE_TAB = 9

	element.addEventListener('keydown', function (e) {
		var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB

		if (!isTabPressed) {
			return
		}

		if (e.shiftKey) {
			/* shift + tab */ if (document.activeElement === firstFocusableEl) {
				lastFocusableEl.focus()
				e.preventDefault()
			}
		} /* tab */ else {
			if (document.activeElement === lastFocusableEl) {
				firstFocusableEl.focus()
				e.preventDefault()
			}
		}
	})
}
```
