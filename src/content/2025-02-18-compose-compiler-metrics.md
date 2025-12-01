---
title: "Compose Compiler metrics"
date: "2025-02-18"
draft: false
path: "/blog/2025-02-18-compose-compiler-metrics"
---

Compose Compiler can now generate metrics about your composables. It's useful for finding performance issues.

You enable it in your build config:

```kotlin
android {
    composeOptions {
        compilerExtensionVersion = "1.5.8"
    }
}

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll(
            "-P",
            "plugin:androidx.compose.compiler.plugins.kotlin:metricsDestination=${project.buildDir}/compose-metrics",
            "-P",
            "plugin:androidx.compose.compiler.plugins.kotlin:reportsDestination=${project.buildDir}/compose-reports"
        )
    }
}
```

But here's what I learned - the metrics show things like recomposition counts, stability issues, and skipped composables. It helps identify which composables are recomposing too frequently.

The reports are JSON files that you can analyze. There are tools to visualize them, but even reading the raw data is helpful:

```json
{
  "composable": "MyScreen",
  "recompositions": 42,
  "skips": 5,
  "stability": "unstable"
}
```

Also, the compiler can tell you which parameters are unstable, which helps you optimize:

```kotlin
// Unstable - causes recomposition
@Composable
fun MyComposable(items: List<Item>) { }

// Stable - can skip recomposition
@Composable
fun MyComposable(items: ImmutableList<Item>) { }
```

One gotcha - the metrics are generated at compile time, so they're based on static analysis. Runtime behavior might differ, but it's still useful for finding potential issues.

And if you're seeing high recomposition counts, the metrics can help you identify which composables are the problem. Then you can optimize those specific ones.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

