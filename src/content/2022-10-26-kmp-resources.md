---
title: "Sharing resources in KMP"
date: "2022-10-26"
draft: false
path: "/blog/2022-10-26-kmp-resources"
---

Trying to share resources like strings, images, and files in KMP. It's not as straightforward as I hoped.

For strings, you can use `compose-resources` or create a simple data structure:

```kotlin
// commonMain
object Strings {
    const val APP_NAME = "My App"
    const val WELCOME_MESSAGE = "Welcome"
    
    fun getGreeting(name: String) = "Hello, $name"
}
```

But here's what got me - if you need localized strings, you'll need a more sophisticated solution. Compose Resources can handle this, but the setup is involved.

For images, you can't share actual image files in common code. You need to put them in platform-specific resource folders and reference them through expect/actual:

```kotlin
// commonMain
expect class ImageResources {
    val logo: Any
}

// androidMain
actual class ImageResources {
    actual val logo = R.drawable.logo
}

// iosMain
actual class ImageResources {
    actual val logo = UIImage(named = "logo")
}
```

Also, if you're using Compose Multiplatform, you can load images from URLs or embed them as base64, but that's not ideal for all use cases.

One thing I learned - configuration files and JSON can be shared as source files in common code. You can read them at compile time or runtime, depending on your needs.

And if you need platform-specific resources (like different images for Android and iOS), you'll need to handle that with expect/actual or conditional compilation.

One gotcha - file paths are different on each platform. If you're reading files from the file system, you'll need platform-specific code or use a library that abstracts this.

The resource management story in KMP is still evolving. For now, expect/actual is the most reliable approach, even if it's a bit verbose.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

