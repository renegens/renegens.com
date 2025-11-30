---
title: "ProGuard rules for Retrofit"
date: "2020-11-12"
draft: false
path: "/blog/2020-11-12-proguard-rules-retrofit"
---

App was crashing in release builds with ProGuard enabled. The issue was with Retrofit models.

ProGuard obfuscates class names and removes unused code, but Retrofit uses reflection to serialize/deserialize JSON. If the model classes get obfuscated or removed, Retrofit can't work.

You need to keep your model classes:

```proguard
# Keep Retrofit interfaces
-keep,allowobfuscation,allowshrinking interface retrofit2.Call
-keep,allowobfuscation,allowshrinking class retrofit2.Response

# Keep your model classes
-keep class com.example.models.** { *; }

# Or if using Gson
-keepattributes Signature
-keepattributes *Annotation*
-keep class sun.misc.Unsafe { *; }
-keep class com.google.gson.** { *; }
```

But here's what got me - if you're using generic types in your models, you need to keep the generic signature. ProGuard removes generic type information by default, which breaks Gson/Moshi.

Also, if your models have generic fields like `List<SomeType>`, make sure `SomeType` is also kept. ProGuard might remove it if it thinks it's unused.

One more thing - if you're using Kotlin data classes, make sure you're keeping the synthetic methods that Gson/Moshi use. Sometimes ProGuard removes getters/setters that it thinks are unused.

The easiest solution is to add `@Keep` annotation to your model classes, or use `-keep` rules for the entire package containing your models.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

