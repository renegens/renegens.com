---
title: "Navigation with Compose"
date: "2021-05-28"
draft: false
path: "/blog/2021-05-28-compose-navigation"
---

Started using Navigation Component with Compose and ran into some issues with state preservation.

When navigating between screens, the previous screen's state is lost by default. If you want to preserve state, you need to use `saveState` and `restoreState`:

```kotlin
NavHost(navController, startDestination = "home") {
    composable("home") { HomeScreen() }
    composable("details") { DetailsScreen() }
}
```

But if you want the backstack to preserve state, you need to make sure your ViewModels are scoped correctly. If you're using `hiltViewModel()` or `viewModel()`, they're scoped to the navigation graph by default, which means they survive configuration changes but not necessarily navigation.

For state that should persist across navigation, use a shared ViewModel or state holder:

```kotlin
val sharedViewModel: SharedViewModel = hiltViewModel()

composable("home") {
    HomeScreen(sharedViewModel)
}

composable("details") {
    DetailsScreen(sharedViewModel)
}
```

Also, passing complex objects through navigation arguments is not recommended. Use IDs or simple primitives, then fetch the full object in the destination screen. Navigation arguments are saved to the saved state, so they need to be serializable.

One gotcha - if you're using deep links, make sure your route patterns match exactly. Navigation is strict about this, and a small mismatch will cause the navigation to fail silently.

And if you're using type-safe arguments with the Navigation Compose plugin, make sure your argument types are supported. Not all types work out of the box.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

