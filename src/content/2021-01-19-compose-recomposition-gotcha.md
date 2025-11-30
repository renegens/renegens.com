---
title: "Compose recomposition gotcha"
date: "2021-01-19"
draft: false
path: "/blog/2021-01-19-compose-recomposition-gotcha"
---

Spent way too long debugging why my composable wasn't updating when the state changed.

The issue was that I was reading the state inside a lambda that wasn't being recomposed. Compose only recomposes when you read state directly in the composable body, not inside callbacks or lambdas.

```kotlin
@Composable
fun MyScreen(viewModel: MyViewModel) {
    val count = viewModel.count.value
    
    // This works - count is read in composable body
    Text("Count: $count")
    
    // This doesn't trigger recomposition when count changes
    Button(onClick = { 
        Log.d("TAG", "Count: $count") // Wrong - uses stale value
    }) {
        Text("Click me")
    }
}
```

If you need the latest value inside a callback, you need to read it from the state holder directly, or use a different pattern. For ViewModels, you can observe the state:

```kotlin
val count by viewModel.count.observeAsState()
```

But the real gotcha is that lambdas capture the value at composition time. If the state changes, the lambda still has the old value unless you're reading it fresh each time.

Also, if you're using `remember` with a key that doesn't change, the remembered value won't update even if dependencies change. Make sure your keys are correct.

One more thing - if you're passing state down to child composables, make sure you're passing the state object itself, not just the value. Otherwise changes won't propagate.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

