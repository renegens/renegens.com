---
title: "Material Components theming confusion"
date: "2020-02-20"
draft: false
path: "/blog/2020-02-20-material-components-theming"
---

Switched to Material Components and spent half a day trying to figure out why my buttons looked different. The issue was with theming.

Material Components use a different theming system than the old AppCompat. You need to use `MaterialComponents` theme as your base theme, not `AppCompat`.

```xml
<style name="AppTheme" parent="Theme.MaterialComponents.DayNight">
    <item name="colorPrimary">@color/primary</item>
    <item name="colorPrimaryVariant">@color/primaryDark</item>
    <item name="colorSecondary">@color/secondary</item>
</style>
```

But here's what confused me - if you're using Material Components, your buttons automatically get the Material styling. If you want the old AppCompat button style, you need to explicitly use `AppCompatButton` or set `app:backgroundTint` to override it.

Also, the ripple effect is automatic with Material buttons, which is nice, but if you're customizing the background, make sure you're using a `RippleDrawable` or the ripple won't work properly.

One gotcha: if you mix Material Components with AppCompat components in the same layout, you might get inconsistent styling. Best to stick with one or the other, or be very explicit about which components you're using.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

