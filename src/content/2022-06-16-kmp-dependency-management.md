---
title: "KMP dependency management headaches"
date: "2022-06-16"
draft: false
path: "/blog/2022-06-16-kmp-dependency-management"
---

Managing dependencies in KMP is more complex than regular Android projects. Not all libraries support KMP yet, and when they do, the setup can be tricky.

First, you need to check if a library has KMP support. Many popular Android libraries are Android-only, so you'll need alternatives or expect/actual wrappers.

For libraries that do support KMP, you add them to the common source set:

```kotlin
sourceSets {
    val commonMain by getting {
        dependencies {
            implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
            implementation("io.ktor:ktor-client-core:2.0.0")
        }
    }
}
```

But here's what got me - some libraries have platform-specific artifacts. You need to add the right one for each platform:

```kotlin
val androidMain by getting {
    dependencies {
        implementation("io.ktor:ktor-client-android:2.0.0")
    }
}

val iosMain by getting {
    dependencies {
        implementation("io.ktor:ktor-client-ios:2.0.0")
    }
}
```

Also, version alignment is important. If you're using multiple KMP libraries, make sure their Kotlin versions are compatible. Mismatched versions can cause build failures or runtime issues.

One gotcha - if a library doesn't have KMP support, you might be able to use it with expect/actual, but you'll need to create wrappers yourself. This can be a lot of work, so check if there's a KMP alternative first.

And if you're using transitive dependencies, make sure they're also KMP-compatible. Sometimes a library claims KMP support, but its dependencies don't, which causes issues.

The dependency resolution can be slow too, especially when building for multiple targets. But that's getting better with newer Gradle versions.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

