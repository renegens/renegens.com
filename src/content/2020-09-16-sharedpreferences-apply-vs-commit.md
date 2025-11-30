---
title: "SharedPreferences apply vs commit"
date: "2020-09-16"
draft: false
path: "/blog/2020-09-16-sharedpreferences-apply-vs-commit"
---

Was debugging why some preferences weren't being saved and realized I was mixing `apply()` and `commit()` without understanding the difference.

`commit()` is synchronous - it writes to disk immediately and returns a boolean indicating success. `apply()` is asynchronous - it writes to memory immediately, then schedules a disk write, and returns void.

```kotlin
// Synchronous - blocks until written
val success = prefs.edit().putString("key", "value").commit()

// Asynchronous - returns immediately
prefs.edit().putString("key", "value").apply()
```

The problem I had was that I was calling `apply()` and then immediately reading the value, expecting it to be there. But `apply()` doesn't guarantee the disk write has completed, so if the app crashes or the process is killed, the value might not be persisted.

For most cases, `apply()` is fine and recommended because it doesn't block the UI thread. But if you need to ensure the write completes (like before starting an activity that depends on that value), use `commit()`.

One thing to watch out for - if you're calling `apply()` multiple times in quick succession, Android batches them together, which is efficient. But if you need each write to be separate, you might need `commit()`.

Also, `apply()` can fail silently. If you need to know if the write succeeded, use `commit()` and check the return value.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

