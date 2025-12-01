---
title: "Compose for Desktop gotchas"
date: "2022-05-25"
draft: false
path: "/blog/2022-05-25-compose-desktop"
---

Built a desktop app with Compose and learned some platform-specific things.

First, window management is different. You need to use `Window` composable and configure it:

```kotlin
fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "My App"
    ) {
        MyAppContent()
    }
}
```

But here's what got me - keyboard shortcuts and menu bars work differently than mobile. You need to use `LocalWindowState` and handle keyboard events explicitly:

```kotlin
val windowState = LocalWindowState.current
LaunchedEffect(Unit) {
    windowState.keyboard.setShortcut(Key.C, ctrl = true) {
        // Handle Ctrl+C
    }
}
```

Also, file dialogs and system integration are platform-specific. You'll need expect/actual for things like opening file dialogs or accessing system preferences.

One thing I learned - Compose Desktop uses Skia for rendering, which is different from Android's rendering. Some visual differences might appear, especially with custom drawing or complex layouts.

Also, if you're sharing code with Android, watch out for platform-specific APIs. Things like `LocalContext` don't exist on desktop, so you'll need to handle that with expect/actual or conditional compilation.

Performance is generally good, but if you're doing heavy computations, make sure you're using coroutines properly. Desktop apps don't have the same lifecycle constraints as mobile, so you need to manage resources yourself.

And if you're packaging for distribution, the Gradle plugin can create native installers for Windows, Mac, and Linux, which is nice. But the file sizes are larger than native apps.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

