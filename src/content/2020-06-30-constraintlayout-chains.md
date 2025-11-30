---
title: "ConstraintLayout chains behavior"
date: "2020-06-30"
draft: false
path: "/blog/2020-06-30-constraintlayout-chains"
---

ConstraintLayout chains are powerful but the behavior can be subtle.

I had three views in a horizontal chain and wanted them evenly spaced. Set up the chain with `spread` mode, but they weren't spacing correctly.

Turns out, for chains to work properly, each view in the chain needs to be constrained to the previous one AND the next one. If you miss a constraint, the chain breaks.

```xml
<!-- Correct chain setup -->
<View
    android:id="@+id/view1"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintEnd_toStartOf="@id/view2" />

<View
    android:id="@+id/view2"
    app:layout_constraintStart_toEndOf="@id/view1"
    app:layout_constraintEnd_toStartOf="@id/view3" />

<View
    android:id="@+id/view3"
    app:layout_constraintStart_toEndOf="@id/view2"
    app:layout_constraintEnd_toEndOf="parent" />
```

Then set the chain style on the first view:

```xml
<View
    android:id="@+id/view1"
    app:layout_constraintHorizontal_chainStyle="spread" />
```

The chain styles are:
- `spread` - evenly distribute space
- `spread_inside` - spread but keep first/last at edges
- `packed` - pack views together

But here's what I learned - if your views have different sizes, `spread` might not look right. You might want `packed` with a bias, or use `spread_inside` instead.

Also, chains work with weights if you set `layout_constraintHorizontal_weight` or `layout_constraintVertical_weight`, which gives you more control over distribution.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

