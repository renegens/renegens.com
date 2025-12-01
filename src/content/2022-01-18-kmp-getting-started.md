---
title: "Getting started with Kotlin Multiplatform"
date: "2022-01-18"
draft: false
path: "/blog/2022-01-18-kmp-getting-started"
---

Started experimenting with Kotlin Multiplatform and hit some roadblocks right away. The setup is more involved than I expected.

First thing - you need to configure your `build.gradle.kts` files correctly. The common module needs to specify which targets you want:

```kotlin
kotlin {
    android()
    ios()
    
    sourceSets {
        val commonMain by getting {
            dependencies {
                // Common dependencies
            }
        }
        val androidMain by getting {
            dependencies {
                // Android-specific dependencies
            }
        }
        val iosMain by getting {
            dependencies {
                // iOS-specific dependencies
            }
        }
    }
}
```

But here's what got me - if you're using expect/actual, you need to define the `expect` declaration in commonMain and the `actual` implementation in each platform's source set. The names need to match exactly.

```kotlin
// commonMain
expect fun getPlatformName(): String

// androidMain
actual fun getPlatformName(): String = "Android"

// iosMain
actual fun getPlatformName(): String = "iOS"
```

Also, if you're sharing code with iOS, you need to think about what can be shared. UI code can't be shared (unless you're using Compose Multiplatform), but business logic, data models, and networking can be.

One gotcha - if you're using coroutines, make sure you're using the right version. KMP has its own coroutines library that works across platforms. Regular Android coroutines won't work in common code.

And the build times... they're longer than regular Android builds, especially when building for multiple targets. But the code sharing is worth it once you get past the initial setup.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

