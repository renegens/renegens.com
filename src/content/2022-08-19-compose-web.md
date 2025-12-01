---
title: "Compose for Web experiments"
date: "2022-08-19"
draft: false
path: "/blog/2022-08-19-compose-web"
---

Tried Compose for Web and it's interesting, but definitely experimental. The approach is different from traditional web development.

Compose for Web compiles to JavaScript and uses a virtual DOM-like approach. The setup requires the web target:

```kotlin
kotlin {
    js(IR) {
        browser {
            commonWebpackConfig {
                cssSupport.enabled = true
            }
        }
        binaries.executable()
    }
}
```

But here's what confused me - not all Compose APIs work the same way on web. Some Material components might render differently, and performance can vary.

Also, if you're used to HTML/CSS, Compose for Web is a different mental model. You're writing Kotlin/Compose code, not HTML. This is great if you're already familiar with Compose, but if you're a web developer, there's a learning curve.

```kotlin
@Composable
fun WebApp() {
    MaterialTheme {
        Column {
            Text("Hello Web")
            Button(onClick = { }) {
                Text("Click me")
            }
        }
    }
}
```

One gotcha - styling works differently. You can use `Modifier` like in Android, but CSS integration is limited. If you need custom CSS, you'll need to use `style` blocks or external stylesheets.

Also, if you're sharing code with Android/iOS, some APIs might not be available on web. You'll need expect/actual or conditional compilation for platform-specific features.

Performance is okay for simple UIs, but complex layouts might be slower than native web frameworks. The bundle size can also be large, especially if you're including a lot of Compose runtime code.

But the idea of sharing UI code across Android, iOS, desktop, and web is compelling, even if it's not production-ready yet.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

