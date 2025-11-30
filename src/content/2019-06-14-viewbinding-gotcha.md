---
title: "ViewBinding gotcha"
date: "2019-06-14"
draft: false
path: "/blog/2019-06-14-viewbinding-gotcha"
---

Just started using ViewBinding in a new project and ran into something that took me a while to figure out.

I was trying to access views in a Fragment and kept getting null pointer exceptions. Turns out I was trying to use the binding before `onCreateView` completed.

The binding needs to be created in `onCreateView` and then you can access it. But here's the thing - if you're doing any initialization in `onViewCreated`, make sure you're using the binding reference, not trying to access views directly.

```kotlin
override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
): View? {
    binding = FragmentMainBinding.inflate(inflater, container, false)
    return binding.root
}

override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    // Now you can safely use binding.textView
    binding.textView.text = "Hello"
}
```

Also, don't forget to set binding to null in `onDestroyView` to avoid memory leaks. The Fragment view lifecycle is different from the Fragment lifecycle itself.

```kotlin
override fun onDestroyView() {
    super.onDestroyView()
    binding = null
}
```

Simple stuff, but easy to miss when you're used to findViewById everywhere.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

