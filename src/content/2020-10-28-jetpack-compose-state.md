---
title: "Jetpack Compose state management"
date: "2020-10-28"
draft: false
path: "/blog/2020-10-28-jetpack-compose-state"
---

Started experimenting with Jetpack Compose and immediately ran into state management issues.

In Compose, you need to use `remember` to hold state, otherwise it gets reset on every recomposition. But `remember` only works within a composable function's scope.

```kotlin
@Composable
fun MyScreen() {
    var count by remember { mutableStateOf(0) }
    
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

But here's what confused me - if you want to share state between composables, you need to lift it up or use a state holder. Just passing a regular variable won't work because Compose needs to track changes.

```kotlin
// This won't trigger recomposition
@Composable
fun Parent() {
    var count = 0
    Child(count = count) // Child won't update when count changes
}

// This works
@Composable
fun Parent() {
    var count by remember { mutableStateOf(0) }
    Child(count = count, onCountChange = { count = it })
}
```

Also, `remember` is scoped to the composable. If the composable leaves the composition (like navigating away), the state is lost. If you need persistent state, use `rememberSaveable` instead.

One more thing - if you're using ViewModel with Compose, you can observe LiveData or StateFlow, but you need to convert it to Compose state:

```kotlin
val uiState by viewModel.uiState.observeAsState()
```

Compose is still in alpha, so things are changing, but the state management concepts are solid.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

