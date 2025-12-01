---
title: "Full-stack Kotlin with Spring Boot and KMP"
date: "2025-12-09"
draft: false
path: "/blog/2025-12-09-spring-boot-kmp-full-stack"
---

Built a full-stack Kotlin app with Spring Boot backend and KMP mobile clients. The code sharing is impressive.

You can share data models, validation logic, and even some business rules:

```kotlin
// Shared module
@Serializable
data class User(
    val id: String,
    val email: String,
    val name: String
) {
    fun isValid(): Boolean {
        return email.isNotBlank() && email.contains("@")
    }
}

// Spring Boot - same model
@RestController
class UserController {
    @PostMapping("/users")
    fun createUser(@RequestBody user: User): User {
        require(user.isValid()) { "Invalid user" }
        return userService.create(user)
    }
}

// KMP - same model
class UserRepository {
    suspend fun createUser(user: User): User {
        require(user.isValid()) { "Invalid user" }
        return apiClient.post("/users", user)
    }
}
```

But here's what I learned - you can't share the actual code files directly. You need to publish the shared module or use a multi-module setup. But the models and logic are identical.

Also, if you're using kotlinx.serialization, it works on both Spring Boot (with configuration) and KMP. The serialization format matches, so no conversion needed.

One thing that's nice - error handling can be shared too. You can define error types in the shared module and use them on both client and server.

And if you're using coroutines, they work on both Spring Boot (with WebFlux or coroutine support) and KMP. The async patterns are consistent.

The main benefit is type safety and consistency. If you change a model, you'll catch issues at compile time on both client and server.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

