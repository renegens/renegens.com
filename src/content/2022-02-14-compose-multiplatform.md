---
title: "Compose Multiplatform first impressions"
date: "2022-02-14"
draft: false
path: "/blog/2022-02-14-compose-multiplatform"
---

Tried Compose Multiplatform to share UI code between Android and iOS. It's promising but has some rough edges.

The setup requires Compose for Desktop dependencies, even if you're only targeting mobile:

```kotlin
kotlin {
    android()
    ios()
    
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material)
            }
        }
    }
}
```

But here's what confused me - some Compose APIs aren't available on all platforms yet. Things like `LazyColumn` work, but some Material components might not. You need to check platform availability.

Also, if you're using platform-specific features like camera or location, you'll need expect/actual to handle the differences:

```kotlin
// commonMain
expect class PlatformCamera() {
    fun takePhoto()
}

// androidMain
actual class PlatformCamera {
    actual fun takePhoto() {
        // Android camera code
    }
}

// iosMain
actual class PlatformCamera {
    actual fun takePhoto() {
        // iOS camera code
    }
}
```

One thing I learned - Compose Multiplatform for iOS is still experimental, so expect some issues. But for desktop (Windows, Mac, Linux), it's more stable.

Also, the preview doesn't work the same way. You can't use `@Preview` in common code and expect it to work on all platforms. You might need platform-specific previews or just test on actual devices.

The performance on iOS isn't quite there yet compared to native SwiftUI, but it's getting better with each release. For simple UIs, it works fine.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

