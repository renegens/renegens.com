---
title: "WorkManager periodic tasks not running"
date: "2020-01-15"
draft: false
path: "/blog/2020-01-15-workmanager-periodic-tasks"
---

Tried to set up a periodic background task with WorkManager and it wasn't running. After some digging, found out that periodic work has a minimum interval of 15 minutes, which I knew, but the real issue was something else.

Periodic work requests need to be unique. If you enqueue the same periodic work multiple times, it will just update the existing one. But here's what got me - if you're testing on a device with battery optimization enabled, WorkManager might delay your work.

Also, periodic work can't be chained like one-time work. Each periodic work runs independently.

```kotlin
val periodicWork = PeriodicWorkRequestBuilder<MyWorker>(15, TimeUnit.MINUTES)
    .setConstraints(
        Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()
    )
    .build()

WorkManager.getInstance(context)
    .enqueueUniquePeriodicWork(
        "my_unique_work",
        ExistingPeriodicWorkPolicy.KEEP,
        periodicWork
    )
```

The key is using `enqueueUniquePeriodicWork` with a unique name. This prevents duplicate work requests.

One more thing - if you need work to run more frequently than 15 minutes, you're out of luck with periodic work. You'll need to use one-time work and reschedule it yourself, or use AlarmManager for more precise timing (though that's not recommended for most use cases).

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

