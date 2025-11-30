---
title: "OkHttp interceptor order matters"
date: "2020-07-14"
draft: false
path: "/blog/2020-07-14-okhttp-interceptor-order"
---

Added a logging interceptor and an authentication interceptor to OkHttp, but the auth token wasn't being added to the requests.

The issue was the order I added them. Interceptors are executed in the order you add them, but there's a catch - there are two types: application interceptors and network interceptors.

Application interceptors run before the request is sent over the network, and network interceptors run after the connection is established. But more importantly, they run in different phases.

```kotlin
val client = OkHttpClient.Builder()
    .addInterceptor(authInterceptor)  // Runs first
    .addInterceptor(loggingInterceptor) // Runs second
    .addNetworkInterceptor(networkInterceptor) // Runs after connection
    .build()
```

Application interceptors see the request before it goes out, and the response after it comes back. Network interceptors see the actual network request/response, including redirects.

For my case, I needed the auth interceptor to run first (as an application interceptor), then the logging interceptor. But I had them reversed, so the logger was trying to log before the auth headers were added.

Also, if you're using Retrofit, the interceptors run in the order you add them to the OkHttpClient, not the Retrofit builder. This is obvious once you think about it, but easy to miss.

One more thing - if you're modifying the request body in an interceptor, make sure you're creating a new request. The original request is immutable.

[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)

