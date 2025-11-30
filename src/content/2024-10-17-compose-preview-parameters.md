---
title: "Compose Preview parameters"
date: "2024-10-17"
draft: false
path: "/blog/2024-10-17-compose-preview-parameters"
---

Compose Preview got better with parameterized previews. You can preview multiple states easily:

```kotlin
@Preview(showBackground = true)
@Composable
fun PreviewUserCard() {
    UserCard(
        user = User(
            id = "1",
            name = "John Doe",
            email = "john@example.com"
        )
    )
}

@Preview(
    name = "Loading State",
    showBackground = true
)
@Composable
fun PreviewUserCardLoading() {
    UserCard(
        user = null,
        isLoading = true
    )
}
```

But here's what I learned - you can use `@PreviewParameter` to generate multiple previews:

```kotlin
class UserPreviewProvider : PreviewParameterProvider<User> {
    override val values = sequenceOf(
        User("1", "John", "john@example.com"),
        User("2", "Jane", "jane@example.com"),
        User("3", "Bob", "bob@example.com")
    )
}

@Preview
@Composable
fun PreviewUserCard(
    @PreviewParameter(UserPreviewProvider::class) user: User
) {
    UserCard(user = user)
}
```

Also, you can preview different device configurations:

```kotlin
@Preview(
    name = "Dark Mode",
    uiMode = Configuration.UI_MODE_NIGHT_YES
)
@Composable
fun PreviewDarkMode() {
    UserCard(user = sampleUser)
}
```

One gotcha - previews don't work with all Compose APIs. Some platform-specific or experimental APIs might not render in previews.

And if you're using custom fonts or resources, make sure they're available in the preview context. Sometimes previews fail silently if resources aren't found.

The preview system is really useful for rapid iteration. Being able to see multiple states at once speeds up development.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

