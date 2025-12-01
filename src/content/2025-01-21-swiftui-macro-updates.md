---
title: "SwiftUI macro improvements"
date: "2025-01-21"
draft: false
path: "/blog/2025-01-21-swiftui-macro-updates"
---

iOS 18 brought more macro improvements to SwiftUI. The `@Observable` macro got some nice updates.

One thing that's better - you can now use `@Observable` with protocols, which wasn't possible before:

```swift
@Observable
protocol ViewModel {
    var isLoading: Bool { get set }
    func loadData()
}

class UserViewModel: ViewModel {
    var isLoading: Bool = false
    
    func loadData() {
        isLoading = true
        // Load data
        isLoading = false
    }
}
```

But here's what I learned - the observation tracking is more efficient now. SwiftUI only updates views when the specific properties they're using change, not when any property changes.

Also, if you're using `@Observable` with computed properties, make sure they're not doing expensive work. The observation system will track dependencies, but you still need to be careful:

```swift
@Observable
class ViewModel {
    var items: [Item] = []
    
    var filteredItems: [Item] {
        items.filter { $0.isActive } // This runs on every access
    }
}
```

One gotcha - if you need to observe from outside SwiftUI (like in Combine or async contexts), you can use `withObservationTracking`, but it's still a bit verbose.

And if you're migrating from `@ObservableObject`, the migration is mostly straightforward, but watch out for `@Published` properties that were computed. Those need special handling.

The macro system is getting more powerful, but it's still SwiftUI-specific. If you need observation outside SwiftUI, you might still need Combine or manual observation.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

