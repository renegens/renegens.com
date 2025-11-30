---
title: "Compose animations not smooth"
date: "2021-07-22"
draft: false
path: "/blog/2021-07-22-compose-animations"
---

Animations in Compose were stuttering. After some investigation, found out I was animating values that were changing too frequently.

Compose animations work best when you animate between stable states, not continuously changing values. If your state is updating every frame or very frequently, the animation can't keep up.

```kotlin
// Bad - state changes too frequently
var offset by animateFloatAsState(targetValue = calculateOffset())

// Better - animate to a stable target
var targetOffset by remember { mutableStateOf(0f) }
var offset by animateFloatAsState(targetValue = targetOffset)

LaunchedEffect(someCondition) {
    targetOffset = calculateOffset()
}
```

Also, make sure you're using the right animation function. `animateFloatAsState` is for animating a single value, `AnimatedVisibility` is for showing/hiding, and `Crossfade` is for switching between content.

But here's what got me - if you're animating layout changes, you might need `AnimatedContent` instead of just animating the values. Layout animations are different from value animations.

```kotlin
AnimatedContent(
    targetState = currentPage,
    transitionSpec = {
        slideInHorizontally() with slideOutHorizontally()
    }
) { page ->
    PageContent(page)
}
```

One more thing - if you're doing custom animations with `Transition`, make sure your transition states are properly defined. Transitions animate between states, so you need clear start and end states.

And watch out for recomposition during animations. If your composable is recomposing frequently while animating, it can cause jank. Use `derivedStateOf` or other optimization techniques to reduce unnecessary recompositions.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

