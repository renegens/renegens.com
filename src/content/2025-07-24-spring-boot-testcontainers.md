---
title: "Spring Boot with Testcontainers"
date: "2025-07-24"
draft: false
path: "/blog/2025-07-24-spring-boot-testcontainers"
---

Using Testcontainers for integration tests in Spring Boot. It's great for testing with real databases and services.

Testcontainers spins up Docker containers for your tests:

```kotlin
@SpringBootTest
@Testcontainers
class UserRepositoryTest {
    @Container
    val postgres = PostgreSQLContainer("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test")
    
    @DynamicPropertySource
    fun configureProperties(registry: DynamicPropertyRegistry) {
        registry.add("spring.datasource.url") { postgres.jdbcUrl }
        registry.add("spring.datasource.username") { postgres.username }
        registry.add("spring.datasource.password") { postgres.password }
    }
    
    @Test
    fun testUserRepository() {
        // Test with real database
    }
}
```

But here's what I learned - Testcontainers requires Docker to be running. If Docker isn't available, tests will fail. Make sure your CI/CD environment has Docker.

Also, the containers take time to start. Tests are slower than with in-memory databases, but you're testing against the real thing, which catches more issues.

One thing that's helpful - you can reuse containers across tests with `@Container(shared = true)`. This speeds up test execution:

```kotlin
companion object {
    @Container
    @JvmStatic
    val postgres = PostgreSQLContainer("postgres:15")
        .withReuse(true)
}
```

One gotcha - if you're using Testcontainers with multiple test classes, make sure to configure container reuse properly. Otherwise, each test class will start its own container.

And if you're testing with external services (like Redis or Elasticsearch), Testcontainers has modules for those too. It's not just for databases.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

