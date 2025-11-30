---
title: "Spring Boot WebFlux with mobile clients"
date: "2024-09-23"
draft: false
path: "/blog/2024-09-23-spring-boot-reactive"
---

Tried Spring WebFlux for a real-time feature. The reactive approach works, but mobile clients need some adjustments.

WebFlux uses reactive streams, which is great for handling many concurrent connections:

```kotlin
@RestController
class NotificationController {
    @GetMapping(value = ["/notifications/stream"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun streamNotifications(): Flux<Notification> {
        return notificationService.getNotifications()
            .delayElements(Duration.ofSeconds(1))
    }
}
```

But here's what got me - mobile apps need to handle connection drops and reconnection. Server-Sent Events (SSE) work, but you need proper error handling:

```kotlin
// KMP client
val client = HttpClient {
    install(ContentNegotiation) {
        json()
    }
    engine {
        connectTimeout = 30_000
        socketTimeout = 30_000
    }
}

val response = client.get("https://api.example.com/notifications/stream")
```

Also, if you're using WebSockets instead of SSE, the setup is different. WebSockets are bidirectional, which is useful for chat or real-time collaboration.

One thing I learned - WebFlux is great for high-throughput scenarios, but for most mobile apps, regular REST endpoints are simpler. Only use WebFlux if you really need the reactive benefits.

And if you're using coroutines in Spring Boot, you can use `Flow` instead of `Flux`. It's more Kotlin-idiomatic and works well with KMP clients.

The main challenge is handling reconnection and offline scenarios on mobile. The server-side reactive code is straightforward, but the client needs to be robust.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

