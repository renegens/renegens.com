---
title: "SwiftUI data flow patterns"
date: "2024-08-19"
draft: false
path: "/blog/2024-08-19-swiftui-data-flow"
---

Struggling with data flow in SwiftUI. The unidirectional data flow is different from what I'm used to.

In SwiftUI, you pass data down and actions up. But managing state across multiple views can be tricky:

```swift
@Observable
class AppState {
    var currentUser: User?
    var isLoading: Bool = false
}

struct ContentView: View {
    @State private var appState = AppState()
    
    var body: some View {
        NavigationStack {
            if appState.isLoading {
                ProgressView()
            } else {
                HomeView(appState: appState)
            }
        }
    }
}
```

But here's what got me - if you need to share state across the app, you can use `@Environment`:

```swift
@Observable
class AppState {
    var currentUser: User?
}

struct ContentView: View {
    @State private var appState = AppState()
    
    var body: some View {
        HomeView()
            .environment(appState)
    }
}

struct HomeView: View {
    @Environment(AppState.self) private var appState
    
    var body: some View {
        // Use appState here
    }
}
```

Also, if you're using `@Binding`, make sure you understand when to use it. It's for two-way binding, not just passing data down.

One thing I learned - `@State` is for view-local state, `@StateObject` (or `@Observable` now) is for view model state, and `@Environment` is for app-wide state. Knowing which to use when is key.

And if you're passing callbacks, you can use closures, but make sure they're not causing unnecessary view updates. SwiftUI is smart about this, but it's something to watch.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

