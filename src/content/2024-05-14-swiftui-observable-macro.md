---
title: "SwiftUI @Observable macro"
date: "2024-05-14"
draft: false
path: "/blog/2024-05-14-swiftui-observable-macro"
---

iOS 17 introduced the `@Observable` macro, which replaces `@ObservableObject` and `@StateObject`. It's cleaner and easier to use.

Instead of conforming to `ObservableObject` and using `@Published`, you just mark your class with `@Observable`:

```swift
@Observable
class UserViewModel {
    var name: String = ""
    var email: String = ""
    
    func updateName(_ newName: String) {
        name = newName // Automatically triggers UI update
    }
}
```

But here's what confused me - you don't use `@StateObject` or `@ObservedObject` anymore. You just use the view model directly:

```swift
struct UserView: View {
    @State private var viewModel = UserViewModel()
    
    var body: some View {
        VStack {
            TextField("Name", text: $viewModel.name)
            Text(viewModel.email)
        }
    }
}
```

Also, if you're passing the view model to child views, you don't need `@ObservedObject`. Just pass it as a regular parameter, and SwiftUI will observe it automatically.

One gotcha - if you need to observe from outside SwiftUI (like in UIKit), you can use `withObservationTracking`, but it's more involved. The `@Observable` macro is really designed for SwiftUI.

And if you're migrating from `@ObservableObject`, the migration is straightforward. Just remove the protocol conformance and `@Published` wrappers, and mark the class with `@Observable`.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

