---
title: "Testing Compose UI"
date: "2021-10-26"
draft: false
path: "/blog/2021-10-26-compose-testing"
---

Writing tests for Compose UI is different from testing Views. You use `ComposeTestRule` and semantic matchers instead of View matchers.

```kotlin
@Test
fun testButtonClick() {
    composeTestRule.setContent {
        MyScreen()
    }
    
    composeTestRule.onNodeWithText("Click me").performClick()
    composeTestRule.onNodeWithText("Clicked!").assertExists()
}
```

But here's what confused me - finding nodes can be tricky. You need to use semantic properties or test tags:

```kotlin
// Add test tag to composable
Button(
    onClick = { },
    modifier = Modifier.testTag("submit_button")
) {
    Text("Submit")
}

// Find by tag
composeTestRule.onNodeWithTag("submit_button").performClick()
```

Also, if you're testing state changes, make sure you're using `waitForIdle()` or similar to wait for recomposition:

```kotlin
composeTestRule.onNodeWithText("Click me").performClick()
composeTestRule.waitForIdle()
composeTestRule.onNodeWithText("Clicked!").assertExists()
```

But if you're testing async operations or animations, you might need `waitUntil` with a condition:

```kotlin
composeTestRule.waitUntil {
    composeTestRule.onAllNodesWithText("Loading").fetchSemanticsNodes().isEmpty()
}
```

One gotcha - if your composable uses a ViewModel, you'll need to provide a test ViewModel or use a fake. The `hiltViewModel()` function won't work in tests without proper Hilt setup.

And if you're testing navigation, you'll need to set up a test NavController. Navigation Compose provides test utilities for this, but it's a bit more involved than regular UI testing.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

