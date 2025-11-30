---
title: "LazyColumn performance issues"
date: "2021-03-23"
draft: false
path: "/blog/2021-03-23-compose-lazycolumn-performance"
---

LazyColumn was stuttering when scrolling. After some profiling, found out I was doing too much work in the item composable.

LazyColumn only composes the visible items, which is great, but if each item is doing heavy computation or creating expensive objects, you'll see jank.

```kotlin
// Bad - creates new objects on every recomposition
LazyColumn {
    items(data) { item ->
        MyItem(
            data = item,
            onClick = { /* lambda created every time */ }
        )
    }
}

// Better - stable references
LazyColumn {
    items(
        items = data,
        key = { it.id } // Important for performance
    ) { item ->
        MyItem(
            data = item,
            onClick = remember(item.id) { { handleClick(item) } }
        )
    }
}
```

The `key` parameter is crucial - it helps Compose identify which items changed, so it can skip recomposing unchanged items. Without it, Compose might recompose everything when the list changes.

Also, if your item composable is complex, consider extracting it to a separate function and using `@Stable` or making sure it doesn't recreate objects unnecessarily.

One more thing - if you're using `items()` with a list that changes frequently, make sure you're not creating a new list instance on every recomposition. Use `remember` or `derivedStateOf` if the list is computed.

And watch out for side effects in item composables. If you're doing network calls or database queries inside `LazyColumn` items, that's going to hurt performance. Do that work outside and pass the results in.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

