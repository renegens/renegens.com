---
title: "LiveData observer lifecycle gotcha"
date: "2020-04-18"
draft: false
path: "/blog/2020-04-18-livedata-observer-lifecycle"
---

LiveData observers are lifecycle-aware, which is great, but I ran into an issue where my observer wasn't being called.

The problem was that I was observing from a Fragment that was in the backstack. When a Fragment is in the backstack, its view is destroyed but the Fragment itself isn't. So if you're observing in `onViewCreated`, the observer gets removed when the view is destroyed.

The solution is to observe in `onCreate` or use the Fragment's viewLifecycleOwner:

```kotlin
// This gets removed when view is destroyed
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    viewModel.data.observe(this) { ... }
}

// Better - tied to Fragment lifecycle
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    viewModel.data.observe(this) { ... }
}

// Or use viewLifecycleOwner for view-related updates
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    viewModel.data.observe(viewLifecycleOwner) { ... }
}
```

The `viewLifecycleOwner` is specifically for this - it's tied to the view lifecycle, so it automatically handles the backstack case. When the Fragment's view is recreated, the observer is reattached.

This is one of those things that works fine until you test navigation thoroughly. The backstack behavior is easy to miss during initial development.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

