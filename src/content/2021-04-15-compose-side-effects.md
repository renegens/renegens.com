---
title: "Compose side effects and LaunchedEffect"
date: "2021-04-15"
draft: false
path: "/blog/2021-04-15-compose-side-effects"
---

Tried to do a network call inside a composable and it kept firing on every recomposition. That's because composables should be pure functions - no side effects directly in the body.

Compose provides `LaunchedEffect` for side effects that should run when a key changes:

```kotlin
@Composable
fun MyScreen(userId: String) {
    var data by remember { mutableStateOf<Data?>(null) }
    
    LaunchedEffect(userId) {
        data = repository.fetchData(userId)
    }
    
    // Use data...
}
```

The key here is the `userId` parameter - the effect only runs when `userId` changes. If you don't provide a key, it runs on every recomposition, which is usually not what you want.

But here's what got me - if you need to run something only once when the composable first appears, use `Unit` as the key:

```kotlin
LaunchedEffect(Unit) {
    // Runs once
}
```

For side effects that should run on every recomposition (rare, but sometimes needed), use `DisposableEffect` or `SideEffect`. But usually you want `LaunchedEffect` with proper keys.

Also, if your side effect returns a value, `LaunchedEffect` is a coroutine scope, so you can use `async` or other coroutine builders. But remember - the effect is cancelled when the composable leaves composition or the key changes.

One more thing - if you need to clean up resources, use `DisposableEffect` instead. It has an `onDispose` block for cleanup.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

