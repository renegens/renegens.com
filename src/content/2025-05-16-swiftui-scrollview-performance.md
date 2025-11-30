---
title: "SwiftUI ScrollView performance"
date: "2025-05-16"
draft: false
path: "/blog/2025-05-16-swiftui-scrollview-performance"
---

Had performance issues with ScrollView in SwiftUI. The default behavior doesn't virtualize, which can cause problems with long lists.

For long lists, you should use `List` instead of `ScrollView`:

```swift
// Bad for long lists
ScrollView {
    VStack {
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
}

// Better for long lists
List(items) { item in
    ItemRow(item: item)
}
```

But here's what I learned - if you need custom layout in a scrollable view, you can use `LazyVStack` or `LazyHStack`:

```swift
ScrollView {
    LazyVStack {
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
}
```

The `Lazy` variants only render visible items, which is much more efficient for long lists.

Also, if you're using `List`, make sure your row views are efficient. Heavy computation in row views will cause jank:

```swift
// Bad - creates new formatter every time
struct ItemRow: View {
    let item: Item
    
    var body: some View {
        Text(item.date, formatter: DateFormatter()) // Creates new formatter
    }
}

// Better - use static formatter
struct ItemRow: View {
    let item: Item
    private static let formatter = DateFormatter()
    
    var body: some View {
        Text(item.date, formatter: Self.formatter)
    }
}
```

One gotcha - `List` has different styling options than `ScrollView`. If you need custom styling, you might need to use `LazyVStack` in a `ScrollView` instead.

And if you're loading data as you scroll, make sure to implement proper pagination. Loading all data at once will hurt performance.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

