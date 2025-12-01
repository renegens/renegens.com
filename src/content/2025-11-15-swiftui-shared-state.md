---
title: "SwiftUI shared state patterns"
date: "2025-11-15"
draft: false
path: "/blog/2025-11-15-swiftui-shared-state"
---

Managing shared state across multiple SwiftUI views. There are several patterns, each with trade-offs.

The simplest is using `@Environment`:

```swift
@Observable
class AppState {
    var currentUser: User?
    var isAuthenticated: Bool = false
}

struct ContentView: View {
    @State private var appState = AppState()
    
    var body: some View {
        NavigationStack {
            HomeView()
        }
        .environment(appState)
    }
}
```

But here's what I learned - `@Environment` is great for app-wide state, but if you need state scoped to a navigation stack or tab, you might want `@State` with binding:

```swift
struct ContentView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView(selectedTab: $selectedTab)
            SettingsView(selectedTab: $selectedTab)
        }
    }
}
```

Also, if you're using `@Observable`, you can pass the object directly and SwiftUI will observe it:

```swift
struct HomeView: View {
    let appState: AppState // No @Environment needed
    
    var body: some View {
        if appState.isAuthenticated {
            AuthenticatedView()
        } else {
            LoginView()
        }
    }
}
```

One gotcha - if you're passing `@Observable` objects around, make sure they're stable references. Creating new instances will break observation.

And if you need to share state between completely separate parts of your app, `@Environment` is the way to go. But for closely related views, passing as parameters is simpler.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

