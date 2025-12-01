---
title: "Networking with Ktor in KMP"
date: "2022-03-21"
draft: false
path: "/blog/2022-03-21-kmp-networking-ktor"
---

Set up networking in KMP using Ktor and ran into some platform-specific issues.

Ktor works great for shared networking code, but you need to configure the HTTP client differently for each platform:

```kotlin
// commonMain
expect fun createHttpClient(): HttpClient

// androidMain
actual fun createHttpClient(): HttpClient {
    return HttpClient(Android) {
        install(ContentNegotiation) {
            json()
        }
    }
}

// iosMain
actual fun createHttpClient(): HttpClient {
    return HttpClient(Ios) {
        install(ContentNegotiation) {
            json()
        }
    }
}
```

But here's what got me - SSL certificate handling is different on each platform. Android uses the system trust store, but iOS might need additional configuration. If you're hitting self-signed certificates or internal APIs, you'll need platform-specific handling.

Also, if you're using JSON serialization, make sure you're using `kotlinx.serialization`, not Gson or Moshi. Those are Android-specific and won't work in common code.

```kotlin
@Serializable
data class ApiResponse(
    val id: Int,
    val name: String
)

val response = httpClient.get<ApiResponse>("https://api.example.com/data")
```

One gotcha - timeouts and retry logic work the same across platforms, which is nice. But if you need platform-specific features like Android's network security config, you'll need expect/actual.

And if you're testing, you can use `MockEngine` in common tests, which is great for sharing test code across platforms.

The main benefit is writing your API calls once and having them work on both platforms. No more maintaining separate networking code for Android and iOS.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

