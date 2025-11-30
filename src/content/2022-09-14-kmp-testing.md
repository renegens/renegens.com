---
title: "Testing shared code in KMP"
date: "2022-09-14"
draft: false
path: "/blog/2022-09-14-kmp-testing"
---

Writing tests for KMP shared code is different from platform-specific tests. You can write tests once and run them on all platforms.

The common test source set lets you write shared tests:

```kotlin
// commonTest
sourceSets {
    val commonTest by getting {
        dependencies {
            implementation(kotlin("test"))
            implementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.6.4")
        }
    }
}
```

But here's what got me - if you're using expect/actual, you need to provide test implementations for each platform. Mocking platform-specific code can be tricky.

```kotlin
// commonTest
expect class TestHttpClient {
    fun mockResponse(response: String)
}

// androidTest
actual class TestHttpClient {
    actual fun mockResponse(response: String) {
        // Android mock implementation
    }
}

// iosTest
actual class TestHttpClient {
    actual fun mockResponse(response: String) {
        // iOS mock implementation
    }
}
```

Also, if you're testing coroutines, you need to use `runTest` from the coroutines test library. Regular `runBlocking` works, but `runTest` gives you better control over timing.

One thing I learned - you can test business logic, data models, and networking code in common tests. But UI tests need to be platform-specific since the UI frameworks are different.

And if you're using SQLDelight, you can use an in-memory database for testing, which works the same across platforms. That's nice for testing database logic.

One gotcha - test execution can be slower when running for multiple targets. But having shared tests means you only write them once, which saves time overall.

Also, some testing libraries don't have KMP support yet, so you might need to use basic Kotlin test functions or find KMP-compatible alternatives.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

