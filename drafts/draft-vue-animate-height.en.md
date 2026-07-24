# The `scrollHeight` trap with `overflow: hidden` (how I learned to animate automatic height)

## The need

On the homepage of my project [tronche](https://tronche.cc), I have a code block with tabs (Nuxt, React, Solid, Svelte…). Clicking a tab swaps the content, and I wanted the block's height to animate smoothly between old and new values.

I sat down last night thinking this would take an LLM prompt, a few manual tweaks, some cleanup, a review, and bed. 5 minutes tops. Not even close.

Nothing fancy on the surface: a classic FLIP animation (First, Last, Invert, Play).

```js
// 1. Measure old height
const prevHeight = wrapper.scrollHeight

// 2. Lock current height
wrapper.style.height = prevHeight + 'px'

// 3. Let the DOM update
await nextTick()

// 4. Measure new height
const newHeight = wrapper.scrollHeight

// 5. CSS transition
wrapper.style.height = newHeight + 'px'

// 6. Clean up after animation
wrapper.addEventListener('transitionend', () => {
  wrapper.style.height = ''
})
```

Simple, clean, works.

… nope.

## What was actually happening

The animation worked **only when the new content was taller** than the old one. No shrinking. And to top it off, after the first click, **nothing animated anymore**. The block was stuck at its maximum height forever.

I was talking to an AI (yes, times are tough) that gave me exactly the code above. After a few back-and-forths:

> “scrollHeight returns max(clientHeight, contentHeight). If you set height to 400px and the new content is 250px, scrollHeight is still 400.”

**Boom.**

## The trap (`overflow: hidden` + fixed `height` = `scrollHeight` can't shrink)

When an element has:

```css
.wrapper {
  overflow: hidden;
  transition: height 0.35s ease;
}
```

and you set an explicit `height` (via JS), the browser computes `scrollHeight` as:

```
scrollHeight = max(clientHeight, contentHeight)
```

In other words:

1. You measure `prevHeight = 400px` (old content is 400px tall)
2. You set `wrapper.style.height = '400px'` — no visual change
3. The DOM updates, new content is 250px tall
4. But the element's height is still locked at `400px`, so…
5. `scrollHeight = max(400, 250) = 400` — same as before!
6. `prevHeight === newHeight` → bail out, no animation

Worst part: the block stays at 400px indefinitely, even after the animation that never happened.

## The fix (obvious in hindsight)

Don't measure the element with `overflow: hidden`. Measure an **unconstrained child** instead:

```html
<div ref="wrapper" class="code-content-wrapper">  <!-- overflow: hidden here -->
  <div ref="inner" v-html="..."></div>               <!-- no constraints here -->
</div>
```

```js
const prevHeight = wrapper.offsetHeight   // rendered height (reliable)
wrapper.style.height = prevHeight + 'px'  // lock

await nextTick()

const newHeight = inner.scrollHeight       // actual content height (free child!)
wrapper.style.height = newHeight + 'px'    // CSS transition
```

The child has neither `overflow: hidden` nor a fixed `height` → its `scrollHeight` always returns the real content height, regardless of what happens to the parent.

## Why it works

- `wrapper.offsetHeight`: the **rendered** height of the wrapper. Before any manipulation, it reflects the content. After locking, it reflects the locked value. Reliable for the old height.
- `inner.scrollHeight`: the **total content height** of the child. With no overflow or height constraints, it's always the exact measurement. Reliable for the new height.

The CSS transition on the wrapper's `height` does the rest: it goes from `prevHeight` (locked) to `newHeight`, and `transitionend` resets height back to `auto`.

## The reliable FLIP recipe

1. `wrapper.offsetHeight` for the **old** height
2. `inner.scrollHeight` (free child) for the **new** height
3. CSS transition on `wrapper.style.height` between the two values
4. Cleanup: `el.style.height = ''` on `transitionend`

## Takeaway

> **When an element has `overflow: hidden` and a fixed height, `scrollHeight` is clamped to `max(clientHeight, contentHeight)` and can never decrease.**

To measure content that can grow or shrink under an element with `overflow: hidden`: **measure a child, not the parent**.

---

*Written with AI assistance. Reviewed, edited, and corrected by a human.*
