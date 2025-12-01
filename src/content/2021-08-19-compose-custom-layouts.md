---
title: "Custom layouts in Compose"
date: "2021-08-19"
draft: false
path: "/blog/2021-08-19-compose-custom-layouts"
---

Needed a custom layout that wasn't available in Compose, so I tried to create one using `Layout` composable. It's more involved than I expected.

The `Layout` composable gives you full control over measuring and positioning children, but you need to understand how Compose's measurement system works.

```kotlin
@Composable
fun CustomLayout(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    Layout(
        modifier = modifier,
        content = content
    ) { measurables, constraints ->
        // Measure children
        val placeables = measurables.map { it.measure(constraints) }
        
        // Calculate size
        val width = placeables.maxOf { it.width }
        val height = placeables.sumOf { it.height }
        
        // Position and return layout
        layout(width, height) {
            var yPosition = 0
            placeables.forEach { placeable ->
                placeable.placeRelative(x = 0, y = yPosition)
                yPosition += placeable.height
            }
        }
    }
}
```

But here's what confused me - constraints work differently than I expected. When you measure a child, you pass constraints to it, and those constraints affect how the child measures itself. If you want a child to take all available space, you need to pass `Constraints.fixed()` or `Constraints.loose()`.

Also, if you're measuring children multiple times (which you shouldn't do, but sometimes need to), make sure you understand the implications. Compose's measurement system assumes single-pass measurement for performance.

One gotcha - if you're using `Modifier.layout()` for simple custom positioning, that's easier than creating a full custom layout. But for complex layouts, you'll need the `Layout` composable.

And remember - custom layouts can hurt performance if not done carefully. Make sure you're not doing unnecessary work in the measurement or placement phases.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

