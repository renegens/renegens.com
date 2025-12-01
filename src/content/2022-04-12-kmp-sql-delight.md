---
title: "SQLDelight for shared database in KMP"
date: "2022-04-12"
draft: false
path: "/blog/2022-04-12-kmp-sql-delight"
---

Tried SQLDelight for database access in KMP. It's different from Room, but works well once you get the hang of it.

SQLDelight generates Kotlin code from SQL files, which means you write SQL queries directly:

```sql
-- commonMain/sqldelight/database.sq
CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

selectAll:
SELECT * FROM user;

insertUser:
INSERT INTO user(id, name)
VALUES (?, ?);
```

The generated code is platform-agnostic, but you need to provide a platform-specific driver:

```kotlin
// commonMain
expect class DatabaseDriverFactory {
    fun createDriver(): SqlDriver
}

// androidMain
actual class DatabaseDriverFactory {
    actual fun createDriver(): SqlDriver {
        return AndroidSqliteDriver(
            UserDatabase.Schema,
            context,
            "user.db"
        )
    }
}

// iosMain
actual class DatabaseDriverFactory {
    actual fun createDriver(): SqlDriver {
        return NativeSqliteDriver(
            UserDatabase.Schema,
            "user.db"
        )
    }
}
```

But here's what confused me - migrations work differently than Room. You write migration SQL directly in the `.sq` file, and SQLDelight handles the versioning. But you need to be careful with the migration order.

Also, if you're used to Room's type converters, SQLDelight doesn't have those. You need to handle type conversion in your queries or use custom column types.

One gotcha - the generated code is in the `build` directory, so your IDE might not find it until you build. Make sure you run a build before trying to use the generated classes.

And if you're using coroutines, SQLDelight has suspend function support, which is nice. But you need to make sure you're using the right version that supports it.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

