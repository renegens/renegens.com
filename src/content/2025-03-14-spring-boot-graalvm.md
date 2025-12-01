---
title: "Spring Boot with GraalVM native"
date: "2025-03-14"
draft: false
path: "/blog/2025-03-14-spring-boot-graalvm"
---

Tried building Spring Boot apps as GraalVM native images. The startup time is amazing, but there are some gotchas.

GraalVM native images compile to machine code, so they start instantly:

```kotlin
plugins {
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.graalvm") version "0.12.0"
}

graalvmNative {
    binaries {
        main {
            imageName.set("myapp")
            mainClass.set("com.example.MyApplicationKt")
        }
    }
}
```

But here's what got me - reflection and dynamic class loading need special configuration. You need to tell GraalVM what classes to include:

```kotlin
// META-INF/native-image/reflect-config.json
[
  {
    "name": "com.example.User",
    "allDeclaredFields": true,
    "allDeclaredMethods": true
  }
]
```

Also, if you're using libraries that rely on reflection (like many JSON libraries), you might need additional configuration. Spring Boot's GraalVM support helps, but it's not perfect.

One thing I learned - the build time is much longer than regular JAR builds. But the runtime performance and startup time make it worth it for some use cases.

And if you're using features like JPA or Spring Data, you need to be careful. Some features don't work well with native images yet, or need special configuration.

The main benefit is for serverless or containerized deployments where startup time matters. For regular applications, the JVM is still fine.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

