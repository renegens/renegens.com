---
title: "Room migration headache"
date: "2019-11-08"
draft: false
path: "/blog/2019-11-08-room-migration-headache"
---

Added a new column to an existing Room table and the app kept crashing on startup. Classic migration issue.

The problem was that I updated the entity class but forgot to bump the database version and add a migration. Room is strict about this - it will crash if the schema doesn't match what's expected.

Here's what I did:

1. Updated the entity with the new field
2. Bumped the version number in the `@Database` annotation
3. Added a migration path

```kotlin
@Database(entities = [User::class], version = 2)
abstract class AppDatabase : RoomDatabase() {
    // ...
}

val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        database.execSQL("ALTER TABLE user ADD COLUMN email TEXT")
    }
}

Room.databaseBuilder(context, AppDatabase::class.java, "app_database")
    .addMigrations(MIGRATION_1_2)
    .build()
```

One thing I learned - if you're adding a nullable column, you can just add it. But if it's non-nullable, you need to either provide a default value in the migration or make it nullable first, then update existing rows, then make it non-nullable in a later migration.

Also, if you're in development and don't care about existing data, you can use `.fallbackToDestructiveMigration()` but that's obviously not for production.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

