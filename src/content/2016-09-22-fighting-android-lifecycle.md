---
title: "Fighting Android lifecycle"
date: "2016-09-22"
draft: false
path: "/blog/2016-09-22-fighting-android-lifecycle"
---

What is the Android lifecycle of an activity. Let’s not deal with Fragments at this point cause they are basically the same but with some more methods and both things apply either to Fragments or Activities. The issue at hand was with either RxJava or an event bus. I faced the same issue on two project I am working on.

On project A I needed to implement a connectivity indicator like the one Messenger from Facebook has. So far so good, I was researching firstly how to do this with the Android framework but as many things today there was an RxJava library for that. It is called [ReactiveNetwork](https://github.com/pwittchen/ReactiveNetwork) which exposes a nice Observable boolean about the connectivity. I opted in for the expensive version which actually opens a socket connection to a remote host to check if you can get an Internet connection. Looking at the documentation I needed just to add the below code.

```java
ReactiveNetwork.observeInternetConnectivity()
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread()) 
    .subscribe(new Action1() { 
        @Override public void call(Boolean isConnectedToInternet) { 
            do something with isConnectedToInternet value 
            } 
        });
```

I added some views inside the callback and ready I was. Well I am aware of memory leaks so I added a subscription to it but because I had another Observable doing something else I needed to use the **CompositeSubscription**. First question that came to my mind is how can we create such thing. We could use the simple Subscription and we simply needed to add the Observable to it. Turns out you have to create it. Hardcore as I am I didn’t need to look at the documentation and started writing. I was expecting something like a Builder or an GetInstance method. Guess what it was neither of them. A lame old **new CompositeSubscription**.

I thought that the **onCreate()** method was a good place and I went ahead and added it there. As for the **unsubscribe()** part it was in the **onStop()**. But after the object is unsubscribed you can’t add new subscriptions to it, but instead you have to create a new object. It was clear that I needed to **unsubscribe()** in onStop but onCreate was not called every time so I needed to move it elsewhere. My second attempt was in **onResume()**. But guess what, because I had the **unsubscribe()** in onStop it wouldn’t work. So after some tinkering around I settled the right way for this would be in **onStart()** which is guaranteed to be called every time. I am unsubscribing in **onStop()** so I would keep the connection running when not in the foreground, so when **onResume()** was being called it would be ready to work.

On project B I was facing the same problem but this time with an event bus. The one by [Otto](http://square.github.io/otto/) if you are wondering. This was not RxJava although I had it there somewhere or better said the project is in the process of moving from an event bus to RxJava but at this time they are co-existing with no problems and I should mention if you obey the correct way of subscribing and subscribing to the event bus you will not face any problems. So what is the correct way here again? As stated by the guys at Square and on [StackOverflow](http://stackoverflow.com/questions/19692711/illegalargumentexception-with-otto-event-bus-in-fragment-instance/19737191#19737191).

> A reliable solution is to use onStart()/onStop() methods to register/unregister receivers. This is what Square guys suggest too. They explain it like this. If activity is in background, it does not need to refresh UI anyway, because UI is not visible. Once activity comes foreground, it will receive update and refresh UI.

So there you have it do you work in **onStart()** and **onStop()**.
