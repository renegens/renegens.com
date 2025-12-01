---
title: "Coroutines cancellation got me again"
date: "2019-09-22"
draft: false
path: "/blog/2019-09-22-coroutines-cancellation"
---

Spent way too much time debugging why my network call wasn't completing. The coroutine was being cancelled before the API response came back.

Turns out I was launching the coroutine in a ViewModel scope, but when the Fragment was detached, the ViewModel's scope was getting cancelled. Which makes sense, but I wasn't expecting it.

The fix? Use `viewModelScope.launch` with `NonCancellable` for operations that need to complete regardless of the ViewModel lifecycle, or better yet, use a different scope for long-running operations.

```kotlin
viewModelScope.launch {
    try {
        val result = repository.fetchData()
        _uiState.value = UiState.Success(result)
    } catch (e: Exception) {
        _uiState.value = UiState.Error(e.message)
    }
}
```

But if you really need something to finish even after the ViewModel is cleared, you might want to use `GlobalScope` or a custom scope. Though GlobalScope is generally not recommended, sometimes you need it for things like logging or analytics that should complete regardless.

Actually, the better approach is to use `lifecycleScope` in the Fragment/Activity if you need it tied to the UI lifecycle, or create a custom scope tied to the Application.

Just a reminder to always think about cancellation when working with coroutines. It's one of those things that works great until it doesn't.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

