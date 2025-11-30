---
title: "Compose Multiplatform going stable"
date: "2024-03-18"
draft: false
path: "/blog/2024-03-18-compose-multiplatform-stable"
---

Compose Multiplatform hit 1.0 and it's much more stable than when I first tried it. The iOS support is actually usable now.

The setup is cleaner too. You can target multiple platforms easily:

```kotlin
kotlin {
    androidTarget()
    iosX64()
    iosArm64()
    iosSimulatorArm64()
    
    jvm("desktop") {
        compilations.all {
            kotlinOptions.jvmTarget = "11"
        }
    }
}
```

But here's what I learned - if you're building for iOS, you need to think about the different architectures. The simulator uses x64 or arm64 depending on your Mac, and devices use arm64. You can build for all of them, but it increases build time.

Also, some Compose APIs that weren't available on iOS before are now there. Things like `LazyColumn`, `TextField`, and most Material components work well.

One thing that's improved - performance on iOS is much better. It's still not as fast as native SwiftUI for complex animations, but for most UIs it's fine.

```kotlin
@Composable
fun SharedScreen() {
    MaterialTheme {
        Column {
            Text("This works on Android, iOS, and Desktop")
            Button(onClick = { }) {
                Text("Click me")
            }
        }
    }
}
```

The main benefit is still code sharing. If you have a team that knows Kotlin/Compose, you can build for multiple platforms with one codebase. The trade-off is some platform-specific workarounds, but those are getting fewer.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

