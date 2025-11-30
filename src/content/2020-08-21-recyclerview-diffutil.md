---
title: "RecyclerView DiffUtil performance"
date: "2020-08-21"
draft: false
path: "/blog/2020-08-21-recyclerview-diffutil"
---

Started using DiffUtil to update RecyclerView items and noticed it was slow with large lists.

DiffUtil uses the Myers algorithm to calculate differences, which is O(N) space and time. For small lists it's fine, but with hundreds of items it can cause jank.

The solution is to run the diff calculation on a background thread:

```kotlin
val diffResult = DiffUtil.calculateDiff(object : DiffUtil.Callback() {
    override fun getOldListSize() = oldList.size
    override fun getNewListSize() = newList.size
    override fun areItemsTheSame(oldPos: Int, newPos: Int) = 
        oldList[oldPos].id == newList[newPos].id
    override fun areContentsTheSame(oldPos: Int, newPos: Int) = 
        oldList[oldPos] == newList[newPos]
})

// Run on background thread
lifecycleScope.launch(Dispatchers.Default) {
    val diffResult = DiffUtil.calculateDiff(diffCallback)
    withContext(Dispatchers.Main) {
        adapter.submitList(newList, diffResult)
    }
}
```

Actually, `ListAdapter` does this automatically if you use `submitList()`, which is why it's recommended. But if you're using a regular `RecyclerView.Adapter`, you need to handle the threading yourself.

One gotcha - make sure your `areItemsTheSame` and `areContentsTheSame` methods are fast. If they're doing heavy computation, DiffUtil will be slow regardless of threading.

Also, if your list items are complex objects, make sure they implement `equals()` properly. DiffUtil uses this to determine if contents are the same.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

