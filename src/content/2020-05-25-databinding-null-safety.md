---
title: "DataBinding null safety"
date: "2020-05-25"
draft: false
path: "/blog/2020-05-25-databinding-null-safety"
---

DataBinding handles null safety automatically, but I ran into a case where it wasn't working as expected.

I had a nullable field in my data class and was trying to use it in a binding expression. DataBinding generates null-safe code, but if you're doing string concatenation or other operations, you need to be careful.

```xml
<!-- This works fine -->
<TextView android:text="@{user.name}" />

<!-- But this can cause issues if user is null -->
<TextView android:text="@{user.name + ` - ` + user.email}" />
```

If `user` is null, the whole expression fails. You can use the null coalescing operator:

```xml
<TextView android:text="@{user?.name ?? `Unknown`}" />
```

Or use the default value syntax:

```xml
<TextView android:text="@{user.name, default=`Loading...`}" />
```

But here's what got me - if you're using two-way binding with `@={}`, the null handling is different. The binding will try to set null values, which might cause issues if your setter doesn't handle null.

Also, if you're using custom binding adapters, make sure they handle null properly. DataBinding will pass null through, so your adapter needs to check for it.

One more tip - if you're seeing `android.databinding` in your stack traces, it's usually a null pointer issue in a binding expression. Check your expressions for null safety.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

