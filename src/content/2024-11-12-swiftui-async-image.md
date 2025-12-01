---
title: "SwiftUI AsyncImage caching"
date: "2024-11-12"
draft: false
path: "/blog/2024-11-12-swiftui-async-image"
---

Using `AsyncImage` in SwiftUI and ran into caching issues. The default behavior doesn't cache images, which causes unnecessary network requests.

`AsyncImage` loads images asynchronously, but it doesn't cache by default:

```swift
AsyncImage(url: URL(string: "https://example.com/image.jpg")) { image in
    image
        .resizable()
        .aspectRatio(contentMode: .fit)
} placeholder: {
    ProgressView()
}
```

But here's what I learned - you can use `URLCache` to enable caching:

```swift
let cache = URLCache(
    memoryCapacity: 50 * 1024 * 1024, // 50 MB
    diskCapacity: 200 * 1024 * 1024   // 200 MB
)
URLCache.shared = cache
```

Also, if you need more control, you can use a custom image loader with caching:

```swift
@Observable
class ImageLoader {
    private var cache = NSCache<NSString, UIImage>()
    
    func loadImage(from url: URL) async -> UIImage? {
        let key = url.absoluteString as NSString
        
        if let cached = cache.object(forKey: key) {
            return cached
        }
        
        guard let (data, _) = try? await URLSession.shared.data(from: url),
              let image = UIImage(data: data) else {
            return nil
        }
        
        cache.setObject(image, forKey: key)
        return image
    }
}
```

One gotcha - `AsyncImage` doesn't handle errors well. If the image fails to load, it just shows nothing. You might want a custom implementation for better error handling.

And if you're loading many images (like in a list), make sure to implement proper cancellation. Otherwise, you might load images that are no longer needed.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

