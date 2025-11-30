---
title: "Taking KMP to production"
date: "2022-12-08"
draft: false
path: "/blog/2022-12-08-kmp-production-thoughts"
---

After months of experimenting with KMP, here are my thoughts on using it in production.

The biggest win is sharing business logic and data models. Networking, database access, and business rules can be shared, which reduces bugs and maintenance. This part is production-ready.

But here's the reality - UI sharing with Compose Multiplatform is still experimental, especially for iOS. If you need a polished, native-feeling app, you might want to keep platform-specific UIs for now.

```kotlin
// Share this - business logic
class UserRepository {
    suspend fun getUser(id: String): User {
        // Shared logic
    }
}

// Keep this platform-specific - UI
// Android: Compose or Views
// iOS: SwiftUI or UIKit
```

Also, the ecosystem is still growing. Not all libraries have KMP support, so you'll need expect/actual wrappers or alternatives. This adds complexity.

One thing I learned - start small. Share data models and networking first, then gradually move more code to common. Don't try to share everything at once.

And if you're using Compose Multiplatform, be prepared for platform-specific workarounds. Some things work differently on each platform, and you'll need to handle those differences.

Testing is easier with shared code, but UI tests still need to be platform-specific. The shared business logic tests are a huge win though.

One gotcha - debugging can be trickier. Stack traces might point to generated code, and platform-specific issues can be hard to track down. Good logging helps.

Also, team knowledge matters. If your team doesn't know Kotlin or Compose, the learning curve is steep. But if they do, KMP can be a great fit.

Overall, KMP is ready for production for business logic sharing, but UI sharing needs more maturity. The tooling and ecosystem are improving quickly though.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

