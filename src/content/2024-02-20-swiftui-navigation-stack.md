---
title: "SwiftUI NavigationStack gotchas"
date: "2024-02-20"
draft: false
path: "/blog/2024-02-20-swiftui-navigation-stack"
---

Working on an iOS app with SwiftUI and ran into navigation issues. NavigationStack replaced NavigationView, but the API is different.

With NavigationStack, you use `navigationDestination` instead of `NavigationLink` with a destination:

```swift
NavigationStack {
    List(users) { user in
        NavigationLink(value: user) {
            UserRow(user: user)
        }
    }
    .navigationDestination(for: User.self) { user in
        UserDetailView(user: user)
    }
}
```

But here's what confused me - if you want to programmatically navigate, you need to use a path binding:

```swift
@State private var path = NavigationPath()

NavigationStack(path: $path) {
    // Your content
}
.onAppear {
    path.append(user) // Navigate programmatically
}
```

Also, if you're using deep linking, NavigationStack handles it differently. You need to set the path from the URL:

```swift
.onOpenURL { url in
    if let userId = extractUserId(from: url) {
        path.append(userId)
    }
}
```

One gotcha - if you're passing complex objects through navigation, make sure they conform to `Hashable`. NavigationStack uses the value for routing, so it needs to be hashable.

And if you need to pop to root or pop multiple screens, you manipulate the path array directly. It's more flexible than the old NavigationView, but also more manual.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

