---
title: "Navigation Component backstack behavior"
date: "2020-03-12"
draft: false
path: "/blog/2020-03-12-navigation-component-backstack"
---

Navigation Component is great, but the backstack behavior can be confusing at first.

I had a flow where users go from A -> B -> C, and I wanted them to go back to A when they finish C, skipping B. The default behavior would take them back through B.

You can use `popUpTo` and `popUpToInclusive` to control this:

```xml
<action
    android:id="@+id/action_c_to_a"
    app:destination="@id/fragment_a"
    app:popUpTo="@id/fragment_a"
    app:popUpToInclusive="false" />
```

This pops everything up to fragment A (but not including A), so the backstack becomes just A.

But here's what tripped me up - if you set `popUpToInclusive="true"`, it will also pop A, leaving you with whatever was before A in the backstack. Usually you want `false` unless you're doing a complete reset.

Also, if you're using `navigateUp()` programmatically, it respects the backstack, but `popBackStack()` gives you more control. You can pop to a specific destination or pop multiple entries at once.

One more thing - the backstack is managed automatically, but if you're doing deep linking or handling back button presses manually, make sure you understand what's in the backstack at that point.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

