---
title: "State management in KMP"
date: "2022-07-28"
draft: false
path: "/blog/2022-07-28-kmp-state-management"
---

Trying to share state management logic between platforms in KMP. The challenge is that UI frameworks are different, but business logic can be shared.

If you're using Compose Multiplatform, you can share state directly:

```kotlin
// commonMain
class SharedViewModel {
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state.asStateFlow()
    
    fun updateState(newState: UiState) {
        _state.value = newState
    }
}

// In Compose
val viewModel = remember { SharedViewModel() }
val state by viewModel.state.collectAsState()
```

But if you're not using Compose, you'll need to expose state in a way that works with both platforms. StateFlow works well because both Android and iOS can observe it.

But here's what got me - if you're using ViewModels on Android, you can't use them directly in common code because ViewModel is Android-specific. You need to create a shared state holder:

```kotlin
// commonMain
class SharedStateHolder {
    val state = MutableStateFlow(UiState())
}

// androidMain
class MyViewModel(private val stateHolder: SharedStateHolder) : ViewModel() {
    val state = stateHolder.state.asStateFlow()
}

// iosMain - use the state holder directly
val stateHolder = SharedStateHolder()
```

Also, if you're using Redux or similar patterns, you can implement them in common code. The store and reducers can be shared, but the UI binding needs to be platform-specific.

One thing I learned - coroutines work great for async state updates in common code. You can use `StateFlow` or `Flow` and both platforms can collect from them, though the collection syntax differs.

And if you need platform-specific state (like Android's SavedStateHandle), you'll need expect/actual or pass it as a parameter to your shared state holder.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

