---
title: "KMP in production - lessons learned"
date: "2024-12-05"
draft: false
path: "/blog/2024-12-05-kmp-production-lessons"
---

After a year of using KMP in production, here are the main lessons.

First, start with business logic sharing, not UI. Sharing data models, networking, and business rules works great. UI sharing is possible but adds complexity:

```kotlin
// Share this - works great
class UserRepository {
    suspend fun getUser(id: String): User {
        // Shared logic
    }
}

// Keep UI platform-specific for now
// Android: Compose
// iOS: SwiftUI
```

But here's what I learned - expect/actual is powerful but can become verbose. Use it sparingly, only for truly platform-specific code. Most code can be shared.

Also, testing shared code is a huge win. Writing tests once and running them on all platforms catches platform-specific bugs early:

```kotlin
// commonTest
@Test
fun testUserValidation() {
    val user = User("", "email")
    assertFalse(user.isValid())
}
```

One thing that surprised me - the build times are still longer than single-platform builds, but the code sharing benefit outweighs it. You write less code overall.

And if you're using Compose Multiplatform, be prepared for platform-specific workarounds. Some things work differently on iOS vs Android, and you'll need to handle those differences.

The ecosystem is much better now. More libraries support KMP, and the tooling has improved. But you'll still need expect/actual for some things.

Overall, KMP is production-ready for business logic sharing. UI sharing is getting there, but platform-specific UIs are still more reliable for complex apps.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

