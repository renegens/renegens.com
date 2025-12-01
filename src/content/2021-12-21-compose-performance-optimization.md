---
title: "Compose performance optimization tips"
date: "2021-12-21"
draft: false
path: "/blog/2021-12-21-compose-performance-optimization"
---

Been profiling my Compose app and found several performance issues. Here are the main things to watch out for.

First, avoid unnecessary recompositions. Use `derivedStateOf` for computed values that depend on state:

```kotlin
// Bad - recomputes on every recomposition
val filteredList = list.filter { it.matches(filter) }

// Better - only recomputes when list or filter changes
val filteredList = remember(list, filter) {
    derivedStateOf { list.filter { it.matches(filter) } }
}.value
```

Also, if you're passing lambdas to composables, make sure they're stable. Use `remember` or make them top-level functions:

```kotlin
// Bad - new lambda every recomposition
MyComposable(onClick = { handleClick() })

// Better - stable reference
val onClick = remember { { handleClick() } }
MyComposable(onClick = onClick)
```

But here's what I learned - if your lambda captures parameters, you might need to include them in the `remember` key:

```kotlin
val onClick = remember(itemId) { { handleClick(itemId) } }
```

For lists, make sure you're using `key()` in `LazyColumn` items. Without keys, Compose can't efficiently track which items changed.

Also, avoid creating objects in composable bodies. Use `remember` for expensive object creation:

```kotlin
// Bad - creates new object every recomposition
val formatter = SimpleDateFormat("yyyy-MM-dd")

// Better - created once
val formatter = remember { SimpleDateFormat("yyyy-MM-dd") }
```

One more thing - if you're using `Modifier` chains, try to keep them stable. Creating new modifiers on every recomposition can cause issues, though Compose is usually smart about this.

And if you're seeing jank, use the Layout Inspector and Recomposition Counters to find what's recomposing too frequently. Sometimes the issue is in a parent composable causing children to recompose unnecessarily.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

