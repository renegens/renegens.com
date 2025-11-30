---
title: "remember keys and when to use them"
date: "2021-11-09"
draft: false
path: "/blog/2021-11-09-compose-remember-keys"
---

`remember` with keys is powerful but easy to misuse. I was using it without keys when I should have been using keys, and vice versa.

`remember` without keys remembers a value for the lifetime of the composable:

```kotlin
val expensiveObject = remember { createExpensiveObject() }
```

But if you want the value to recompute when dependencies change, you need keys:

```kotlin
val computedValue = remember(key1 = userId, key2 = filter) {
    computeValue(userId, filter)
}
```

But here's what got me - if you're using objects as keys, make sure they're stable. If the key object changes reference on every recomposition, `remember` will recompute every time, defeating the purpose.

```kotlin
// Bad - new list instance every time
val value = remember(key1 = listOf(a, b)) { ... }

// Better - use stable keys
val value = remember(key1 = a, key2 = b) { ... }
```

Also, if you're using `remember` with a lambda that captures variables, those variables should be in the key list if they affect the computation:

```kotlin
// Wrong - won't recompute when userId changes
val data = remember {
    fetchData(userId)
}

// Correct - recomputes when userId changes
val data = remember(userId) {
    fetchData(userId)
}
```

One more thing - `remember` is scoped to the composable. If the composable leaves composition, the remembered value is lost. If you need persistence across configuration changes, use `rememberSaveable` instead.

And be careful with `remember` in loops or conditional blocks. Each call to `remember` creates a separate slot, so the same `remember` call in different branches will have different values.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

