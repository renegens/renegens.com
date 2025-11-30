---
title: "Compose theming and dark mode"
date: "2021-06-17"
draft: false
path: "/blog/2021-06-17-compose-theming-dark-mode"
---

Set up Material theming in Compose and dark mode wasn't working properly. The issue was with how I was reading colors.

In Compose, you should use `MaterialTheme.colors` to get theme colors, not hardcoded colors. But the real gotcha is that you need to wrap your app content in a `MaterialTheme` composable for it to work.

```kotlin
@Composable
fun App() {
    MaterialTheme(
        colors = if (isSystemInDarkTheme()) darkColors() else lightColors(),
        typography = Typography,
        shapes = Shapes
    ) {
        // Your app content
    }
}
```

But here's what confused me - if you're reading colors inside a composable, make sure you're reading them from the theme, not from a remembered value:

```kotlin
// Wrong - color is captured at composition time
val color = remember { MaterialTheme.colors.primary }

// Correct - reads from theme each time
val color = MaterialTheme.colors.primary
```

Also, if you want to override the system dark mode setting, you need to track it yourself and pass it to `MaterialTheme`. The `isSystemInDarkTheme()` function reads the system setting, but if you want a manual toggle, you'll need to manage that state yourself.

One more thing - custom colors should be defined in your color palette and referenced through the theme. Don't hardcode colors in composables if you want them to respect dark mode.

And if you're using custom drawables or images that need to change in dark mode, you'll need to handle that separately. Material colors don't automatically change images.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

