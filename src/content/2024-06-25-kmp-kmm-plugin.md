---
title: "KMP plugin and KMM setup"
date: "2024-06-25"
draft: false
path: "/blog/2024-06-25-kmp-kmm-plugin"
---

JetBrains released a KMP plugin that simplifies setup. The configuration is much cleaner now.

Instead of manually configuring source sets, you can use the plugin:

```kotlin
plugins {
    kotlin("multiplatform") version "1.9.20"
    id("com.android.library")
}

kotlin {
    androidTarget()
    iosTarget()
    
    sourceSets {
        commonMain.dependencies {
            implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
        }
    }
}
```

But here's what I learned - the plugin handles a lot of the boilerplate automatically. Source set configuration, dependency management, and build configuration are simplified.

Also, if you're using Android Studio, the KMP plugin provides better IDE support. Code completion, navigation, and debugging work better across platforms.

One thing that's improved - the CocoaPods integration is smoother. If you need iOS dependencies, you can use CocoaPods directly:

```kotlin
cocoapods {
    summary = "My KMP library"
    homepage = "https://example.com"
    version = "1.0"
    ios.deploymentTarget = "14.0"
    pod("SomePod") {
        version = "1.0.0"
    }
}
```

The main benefit is less configuration code. You can focus on writing shared logic instead of fighting with build files.

And if you're new to KMP, the plugin makes it easier to get started. The learning curve is still there, but the setup is less intimidating.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

