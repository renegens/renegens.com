---
title: "Spring Boot backend for KMP apps"
date: "2024-01-15"
draft: false
path: "/blog/2024-01-15-spring-boot-kmp-backend"
---

Built a Spring Boot backend to support a KMP mobile app. The integration is smoother than I expected.

Since both use Kotlin, sharing data models is possible with `kotlinx.serialization`. You can define models in your KMP common module and use them in Spring Boot:

```kotlin
// KMP commonMain
@Serializable
data class User(
    val id: String,
    val name: String,
    val email: String
)

// Spring Boot - same model
@Serializable
data class User(
    val id: String,
    val name: String,
    val email: String
)
```

But here's what got me - Spring Boot uses Jackson by default, not kotlinx.serialization. You need to configure it:

```kotlin
@Configuration
class SerializationConfig {
    @Bean
    fun kotlinSerializationJson(): KotlinSerializationJson {
        return KotlinSerializationJson(Json {
            ignoreUnknownKeys = true
        })
    }
}
```

Also, if you're using Ktor client in KMP, it works great with Spring Boot REST endpoints. The serialization format matches, so no conversion needed.

One thing I learned - Spring Boot's coroutine support works well with KMP's coroutines. You can use `suspend` functions in controllers:

```kotlin
@RestController
class UserController {
    @GetMapping("/users/{id}")
    suspend fun getUser(@PathVariable id: String): User {
        return userService.getUser(id)
    }
}
```

The main benefit is type safety across the stack. If you change a model in KMP, you'll catch issues at compile time in Spring Boot too, assuming you're sharing the code somehow.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

