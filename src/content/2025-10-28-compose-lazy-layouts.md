---
title: "Compose LazyLayout improvements"
date: "2025-10-28"
draft: false
path: "/blog/2025-10-28-compose-lazy-layouts"
---

Compose LazyLayout APIs got some nice improvements. The new `LazyLayout` composable gives more control.

Instead of just `LazyColumn` and `LazyRow`, you can create custom lazy layouts:

```kotlin
LazyLayout(
    items = items,
    modifier = Modifier.fillMaxSize()
) { item, index ->
    ItemRow(item = item)
}
```

But here's what I learned - the key parameter is still important for performance. Make sure your items have stable keys:

```kotlin
LazyColumn {
    items(
        items = users,
        key = { it.id } // Stable key
    ) { user ->
        UserRow(user = user)
    }
}
```

Also, if you need custom layout logic, `LazyLayout` lets you control item placement:

```kotlin
LazyLayout(
    items = items,
    modifier = Modifier.fillMaxSize()
) { item, index ->
    // Custom positioning logic
    Box(modifier = Modifier.offset(x = index * 10.dp)) {
        ItemRow(item = item)
    }
}
```

One gotcha - `LazyLayout` is more flexible but also more complex. For simple lists, `LazyColumn` is still easier.

And if you're using `LazyGrid`, the API is similar. The main difference is the grid configuration:

```kotlin
LazyVerticalGrid(
    columns = GridCells.Fixed(2),
    contentPadding = PaddingValues(16.dp)
) {
    items(items) { item ->
        ItemCard(item = item)
    }
}
```

The lazy layouts are getting more powerful, but the basic `LazyColumn` and `LazyRow` cover most use cases.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

