---
title: "Compose modifier order matters"
date: "2021-02-11"
draft: false
path: "/blog/2021-02-11-compose-modifiers-order"
---

Modifiers in Compose are applied in order, and the order definitely matters. Got burned by this today.

I was trying to add padding and then a background, but the background was covering the padding. Turns out modifiers are applied from left to right, so the rightmost modifier is applied last (visually on top).

```kotlin
// Wrong - background covers padding
Box(
    modifier = Modifier
        .padding(16.dp)
        .background(Color.Blue)
)

// Correct - padding is applied after background
Box(
    modifier = Modifier
        .background(Color.Blue)
        .padding(16.dp)
)
```

Think of it like wrapping a box - you put the background (wrapping paper) first, then add padding (bubble wrap) on top.

But here's what confused me - `clickable` modifier needs to be applied after `padding` if you want the padding area to be clickable. If you put `clickable` before `padding`, only the content area is clickable, not the padding.

```kotlin
// Padding area is clickable
Box(
    modifier = Modifier
        .padding(16.dp)
        .clickable { }
)

// Only content area is clickable
Box(
    modifier = Modifier
        .clickable { }
        .padding(16.dp)
)
```

Also, `fillMaxSize()` and `fillMaxWidth()` should usually come before other size modifiers, otherwise they might not work as expected.

The general rule: layout modifiers (size, padding) go before drawing modifiers (background, border), and interaction modifiers (clickable) go at the end if you want them to cover the whole area.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

