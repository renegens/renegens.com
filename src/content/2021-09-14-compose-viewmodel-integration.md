---
title: "ViewModel with Compose state"
date: "2021-09-14"
draft: false
path: "/blog/2021-09-14-compose-viewmodel-integration"
---

Integrating ViewModels with Compose state took some figuring out. The key is using `observeAsState()` or `collectAsState()` to convert LiveData/StateFlow to Compose state.

```kotlin
@Composable
fun MyScreen(viewModel: MyViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsState()
    
    when (uiState) {
        is UiState.Loading -> LoadingScreen()
        is UiState.Success -> SuccessScreen(uiState.data)
        is UiState.Error -> ErrorScreen(uiState.message)
    }
}
```

But here's what got me - if you're using `observeAsState()` with LiveData, you need to provide an initial value, otherwise the state will be nullable:

```kotlin
// Nullable state
val data by viewModel.data.observeAsState()

// Non-nullable with initial value
val data by viewModel.data.observeAsState(initial = emptyList())
```

For StateFlow, `collectAsState()` handles this automatically since StateFlow always has a value.

Also, if your ViewModel exposes multiple state properties, you might want to combine them into a single UI state class. This makes it easier to manage and test:

```kotlin
data class UiState(
    val items: List<Item> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)
```

One more thing - if you're updating ViewModel state from a composable, make sure you're calling the ViewModel method, not trying to update state directly. ViewModels should own the state, composables should just observe and trigger actions.

And if you're using `remember` with ViewModel, don't do it. ViewModels are already scoped and remembered by the framework. Just use `hiltViewModel()` or `viewModel()` directly.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

