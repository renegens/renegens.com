---
title: "SwiftUI Preview macros"
date: "2025-08-19"
draft: false
path: "/blog/2025-08-19-swiftui-preview-macros"
---

Xcode 16 added preview macros that make SwiftUI previews easier to write.

Instead of wrapping your preview in `#Preview`, you can use the macro:

```swift
#Preview {
    UserView(user: sampleUser)
}

#Preview("Dark Mode") {
    UserView(user: sampleUser)
        .preferredColorScheme(.dark)
}
```

But here's what I learned - you can preview multiple states easily:

```swift
#Preview("Loading") {
    UserView(user: nil, isLoading: true)
}

#Preview("Loaded") {
    UserView(user: sampleUser, isLoading: false)
}

#Preview("Error") {
    UserView(user: nil, error: "Failed to load")
}
```

Also, the macro handles device configuration automatically. You can specify device types:

```swift
#Preview("iPhone 15 Pro", device: .iPhone15Pro) {
    UserView(user: sampleUser)
}
```

One gotcha - previews still don't work with all SwiftUI APIs. Some platform-specific or experimental APIs might not render.

And if you're using `@Observable` view models, make sure to provide them in the preview. The macro makes it easier, but you still need to set up the dependencies.

The macro system is cleaner than the old `PreviewProvider` protocol. Less boilerplate, more readable.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

