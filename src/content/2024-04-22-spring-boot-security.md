---
title: "Spring Boot security with mobile apps"
date: "2024-04-22"
draft: false
path: "/blog/2024-04-22-spring-boot-security"
---

Setting up authentication for mobile apps with Spring Boot. OAuth2 and JWT work, but there are some mobile-specific considerations.

For mobile apps, you typically want stateless authentication with JWTs. Spring Security can handle this:

```kotlin
@Configuration
@EnableWebSecurity
class SecurityConfig {
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http {
            csrf { disable() }
            sessionManagement { sessionCreationPolicy = SessionCreationPolicy.STATELESS }
            authorizeRequests {
                authorize("/api/public/**", permitAll)
                authorize(anyRequest, authenticated)
            }
            oauth2ResourceServer {
                jwt { }
            }
        }
        return http.build()
    }
}
```

But here's what got me - mobile apps need to handle token refresh. You can't use cookies like web apps, so you need an endpoint for refreshing tokens:

```kotlin
@PostMapping("/auth/refresh")
fun refreshToken(@RequestBody request: RefreshTokenRequest): AuthResponse {
    // Validate refresh token and return new access token
}
```

Also, CORS configuration is important if you're testing from web or if your mobile app makes requests from different origins. Make sure to configure it properly:

```kotlin
@Bean
fun corsConfigurationSource(): CorsConfigurationSource {
    val configuration = CorsConfiguration()
    configuration.allowedOrigins = listOf("http://localhost:3000")
    configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE")
    configuration.allowedHeaders = listOf("*")
    val source = UrlBasedCorsConfigurationSource()
    source.registerCorsConfiguration("/**", configuration)
    return source
}
```

One thing I learned - rate limiting is important for mobile APIs. Spring Boot doesn't have built-in rate limiting, so you'll need a library or custom implementation. Mobile apps can be more vulnerable to abuse.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

