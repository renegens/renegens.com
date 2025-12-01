---
title: "Compose modifier composition"
date: "2025-06-11"
draft: false
path: "/blog/2025-06-11-compose-modifier-composition"
---

Compose modifiers can be composed and reused, which is powerful but can be confusing.

You can create custom modifiers by composing existing ones:

```kotlin
fun Modifier.cardStyle(): Modifier = this
    .background(Color.White, RoundedCornerShape(8.dp))
    .padding(16.dp)
    .shadow(4.dp, RoundedCornerShape(8.dp))

@Composable
fun Card(content: @Composable () -> Unit) {
    Box(modifier = Modifier.cardStyle()) {
        content()
    }
}
```

But here's what I learned - modifier order still matters when composing. The modifiers are applied in the order you call them:

```kotlin
// Different results
Modifier
    .padding(16.dp)
    .background(Color.Blue) // Background covers padding

Modifier
    .background(Color.Blue)
    .padding(16.dp) // Padding is outside background
```

Also, you can create modifier extensions that take parameters:

```kotlin
fun Modifier.conditional(
    condition: Boolean,
    modifier: Modifier.() -> Modifier
): Modifier {
    return if (condition) {
        this.then(modifier(Modifier))
    } else {
        this
    }
}

// Usage
Modifier
    .conditional(isEnabled) {
        clickable { }
    }
```

One gotcha - if you're creating complex modifier chains, make sure they're stable. Creating new modifiers on every recomposition can cause performance issues.

And if you're sharing modifiers across composables, consider making them top-level functions or putting them in a shared object. This makes them easier to reuse and test.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

