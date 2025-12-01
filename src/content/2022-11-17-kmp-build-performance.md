---
title: "KMP build performance issues"
date: "2022-11-17"
draft: false
path: "/blog/2022-11-17-kmp-build-performance"
---

KMP builds are slower than regular Android builds, especially when building for multiple targets. Here's what I learned about optimizing them.

First, use Gradle build cache and configure it properly:

```kotlin
// settings.gradle.kts
buildCache {
    local {
        isEnabled = true
    }
}
```

But here's what helped - only build the targets you need during development. If you're only working on Android, don't build iOS:

```kotlin
kotlin {
    android() // Always build this
    
    // Only build iOS when needed
    if (project.findProperty("buildIos") == "true") {
        ios()
    }
}
```

Also, incremental compilation helps, but you need to make sure your source sets are set up correctly. If you change common code, it needs to recompile platform code, which can be slow.

One thing I learned - using `./gradlew build` builds everything, which is slow. Use `./gradlew :module:assembleDebug` to build just what you need for testing.

Also, if you're using expect/actual, changes to expect declarations require recompiling all actual implementations. Try to minimize changes to expect declarations during development.

And if you're on a Mac, building for iOS requires Xcode, which adds overhead. Android-only builds are faster.

One gotcha - the first build after a clean is always slow because everything needs to compile. But subsequent builds should be faster with proper caching.

Also, watch out for dependency resolution. KMP projects have more dependencies (common + platform-specific), which can slow down dependency resolution. Using a dependency cache helps.

The build times are getting better with newer Kotlin and Gradle versions, but they're still longer than single-platform builds. The code sharing benefit usually outweighs the build time cost.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

