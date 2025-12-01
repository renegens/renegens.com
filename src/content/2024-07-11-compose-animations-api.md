---
title: "New Compose animations API"
date: "2024-07-11"
draft: false
path: "/blog/2024-07-11-compose-animations-api"
---

Compose introduced a new animations API that's more declarative. The `AnimatedContent` and `AnimatedVisibility` APIs got updates.

The new API uses `AnimatedContent` with transition specs:

```kotlin
AnimatedContent(
    targetState = currentScreen,
    transitionSpec = {
        slideInHorizontally { fullWidth -> fullWidth } togetherWith
        slideOutHorizontally { fullWidth -> -fullWidth }
    },
    label = "screen_transition"
) { screen ->
    when (screen) {
        Screen.Home -> HomeScreen()
        Screen.Details -> DetailsScreen()
    }
}
```

But here's what I learned - the `togetherWith` and `plus` operators let you combine animations. `togetherWith` runs animations simultaneously, `plus` chains them.

Also, if you need custom animations, you can use `Transition` directly:

```kotlin
val transition = updateTransition(targetState = isExpanded, label = "expand")
val height by transition.animateDp(label = "height") { expanded ->
    if (expanded) 200.dp else 100.dp
}
```

One gotcha - the `label` parameter is important for animations debugging. It shows up in Layout Inspector, which helps when debugging animation issues.

And if you're animating between different content types, `AnimatedContent` handles the keying automatically. You don't need to manually key each piece of content.

The new API is more type-safe and easier to reason about. The old `Crossfade` and manual animation code can be replaced with these new APIs.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

