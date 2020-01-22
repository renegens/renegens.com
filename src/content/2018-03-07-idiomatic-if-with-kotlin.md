---
title: "Idiomatic if with kotlin"
date: "2018-03-07"
draft: false
path: "/blog/2018-03-07-idiomatic-if-with-kotlin"
---

Here is a safe and idiomatic way to the null safe Kotlin operator to check against a value and execute some code.

```kotlin
someObject?.takeIf{ it.status }?.apply{ doThis() }
```

And here is a real word example:

```kotlin
item?.takeIf { it.itemId == android.R.id.home }?.run {             
    onBackPressed()         
}
```
