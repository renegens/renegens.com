---
title: "KMP CocoaPods integration"
date: "2025-09-12"
draft: false
path: "/blog/2025-09-12-kmp-cocoapods-integration"
---

Integrating iOS dependencies via CocoaPods in KMP. The setup is smoother than I expected.

You configure CocoaPods in your `build.gradle.kts`:

```kotlin
plugins {
    kotlin("multiplatform")
    kotlin("native.cocoapods")
}

kotlin {
    cocoapods {
        summary = "My KMP library"
        homepage = "https://example.com"
        version = "1.0"
        ios.deploymentTarget = "14.0"
        
        pod("Alamofire") {
            version = "5.8.0"
        }
    }
}
```

But here's what I learned - you need to run `pod install` after syncing Gradle. The plugin generates a Podfile, but you need to install the pods:

```bash
./gradlew podInstall
```

Also, if you're using expect/actual with CocoaPods dependencies, you need to import them correctly:

```kotlin
// commonMain
expect class NetworkClient {
    fun request(url: String): String
}

// iosMain
import cocoapods.Alamofire.*

actual class NetworkClient {
    actual fun request(url: String): String {
        // Use Alamofire
    }
}
```

One gotcha - CocoaPods integration adds build time. Installing pods and linking them takes time, especially on the first build.

And if you're using multiple CocoaPods dependencies, make sure they're compatible. Version conflicts can cause build failures.

The main benefit is being able to use iOS libraries in your KMP code. You can't use them directly in common code, but with expect/actual, you can abstract them.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

