---
title: "Testing ViewModels with coroutines"
date: "2020-12-07"
draft: false
path: "/blog/2020-12-07-testing-viewmodels"
---

Writing tests for ViewModels that use coroutines is trickier than I expected.

The problem is that coroutines run asynchronously, so your test might finish before the coroutine completes. You need to use `runBlocking` or `runTest` to wait for coroutines.

```kotlin
@Test
fun testViewModel() = runBlocking {
    val viewModel = MyViewModel(repository)
    viewModel.loadData()
    assertEquals(expectedValue, viewModel.uiState.value)
}
```

But `runBlocking` blocks the thread, which can cause issues if you have multiple coroutines or timeouts. Better to use `runTest` from the coroutines test library:

```kotlin
@Test
fun testViewModel() = runTest {
    val viewModel = MyViewModel(repository)
    viewModel.loadData()
    advanceUntilIdle() // Wait for all coroutines
    assertEquals(expectedValue, viewModel.uiState.value)
}
```

But here's what got me - if your ViewModel uses `viewModelScope`, you need to use `Dispatchers.setMain` to set a test dispatcher, otherwise the coroutines run on the real main thread which can cause issues in tests.

```kotlin
@Before
fun setup() {
    Dispatchers.setMain(UnconfinedTestDispatcher())
}

@After
fun tearDown() {
    Dispatchers.resetMain()
}
```

Also, if you're testing LiveData or StateFlow, make sure you're observing them properly. LiveData needs an observer to emit values, and StateFlow needs a collector.

One more tip - if your ViewModel has delays or timeouts, use `advanceTimeBy()` in your tests to control time, rather than actually waiting.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

