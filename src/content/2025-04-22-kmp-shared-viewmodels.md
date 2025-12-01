---
title: "Sharing ViewModels in KMP"
date: "2025-04-22"
draft: false
path: "/blog/2025-04-22-kmp-shared-viewmodels"
---

Trying to share ViewModels between Android and iOS. The challenge is that ViewModel is Android-specific, but the logic can be shared.

The solution is to create a shared state holder and platform-specific ViewModels:

```kotlin
// commonMain
class SharedUserState {
    private val _user = MutableStateFlow<User?>(null)
    val user: StateFlow<User?> = _user.asStateFlow()
    
    suspend fun loadUser(id: String) {
        _user.value = repository.getUser(id)
    }
}

// androidMain
class UserViewModel(
    private val state: SharedUserState
) : ViewModel() {
    val user = state.user.asStateFlow()
    
    fun loadUser(id: String) {
        viewModelScope.launch {
            state.loadUser(id)
        }
    }
}

// iosMain - use directly or wrap in Swift
val state = SharedUserState()
```

But here's what I learned - if you're using Compose Multiplatform, you can use the state holder directly in Compose. No need for ViewModel:

```kotlin
@Composable
fun UserScreen(state: SharedUserState = remember { SharedUserState() }) {
    val user by state.user.collectAsState()
    // Use user
}
```

Also, if you need Android-specific features like `SavedStateHandle`, you'll need expect/actual or pass it as a parameter.

One gotcha - lifecycle management is different on each platform. Android has ViewModel lifecycle, iOS doesn't. You need to handle cleanup manually on iOS or use platform-specific lifecycle hooks.

And if you're using dependency injection, you'll need platform-specific modules for ViewModels, but the shared state can be provided from common code.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

