---
title: "In 5 easy steps detect when your app is in foreground"
date: "2018-07-11"
draft: false
path: "/blog/2018-07-11-5-steps-to-determine-app-state"
---

A couple of months ago before **Android Lifecycle components** where a thing I had a requirement to detect when the application state is in the foreground or background. This requirement was brought on [socket.io](https://github.com/socketio/socket.io-client-java) which should be shutting down the connection when the application is in a background state and reopen the connection to the server when the application is in a foreground state. Naturally we are doing this to preserve the users battery and keep the connections to the server as few as possible.

Furthermore there was a technical requirement. Some screens where relaying on **REST** and **socket interactions** simultaneously and some other screens where not using the socket connection at all. Thus I came to the conclusion that it wasn't just enough to detect the overall application lifecycle but also I needed a way to notify screens that they are moved to the background in order to close the socket connection and clean up any resources.

For historic purposes the iOS counterpart has it a bit easier. iOS is getting out of the box an application state _(\[UIApplication sharedApplication\].applicationState)_ which is used to detect in what state the application is and it is orchestrating the event delivery. Unfortunately until now Android didn't had something like that out of the box. So if you needed to track the application state you needed to built this manually or use a library for that.

I took the route to implement this manually since it wasn't trivial to introduce a new dependency on a library which just counts the open Activities. Long story short, I went on and created this Activity counter which was counting the open Activities and with an appropriate delay would issue an event to the Activities that were listening.

This setup was working nicely and get's the job done. Although with the advent of the Lifecycle components we can simplify the code and remove the overhead, resulting in less code to maintain and delegate most of it to the Android Lifecycle components. In order to do that we need to implement a couple of things which is laid out below in 5 easy steps.

> The gist is: We will register the Application class to be the Lifecycle Owner of the application and have an RxSubject to inform whoever is subscribed to it about its state.

### Lets see the code

> You can find a full working example of this approach on [Github](https://github.com/renegens/Foreground-Detector). The sample was created with Android Studio version 3.2 and is using the [AndroidX libraries](https://developer.android.com/topic/libraries/architecture/adding-components#lifecycle). If you want to add the components to an older version without the **Androidx** prefix just use the appropriate libraries.

##### First step

In order to get started we need include a couple of libraries, for now we will just focus on the ones we need for the Lifecycle components to work.

Dependencies for the Lifecycle Components

```java 
implementation "androidx.lifecycle:lifecycle-extensions:$lifecycle\_version" 
kapt "androidx.lifecycle:lifecycle-compiler:$lifecycle\_version"
```

Dependencies for RxJava and the Android Scheduler

```java 
implementation "io.reactivex.rxjava2:rxjava:2.1.16" 
implementation 'io.reactivex.rxjava2:rxandroid:2.0.2'
```

##### Second step

We need to override the **Application Class** and create a custom one for our application. _Please don't forget to add the new name of the application class to the Android Manifest_. In the **onCreate()** function which we have overwritten, add the below code which will make the foregroundDetector the one responsible to get notified about the application state.

```java 
ProcessLifecycleOwner.get().lifecycle.addObserver(foregroundDetector)
```

##### Third step

Create a new class called **ForegroundDetector** and make it a **LifecycleObserver**. Let's see what the _ForegroundDetector.class_ is made of.

```java
class ForegroundDetector : LifecycleObserver {

    @OnLifecycleEvent(Lifecycle.Event.ON\_START) 
    fun inForeground() { Log.d("TAG", "APP Foreground") }

    @OnLifecycleEvent(Lifecycle.Event.ON\_STOP) 
    fun inBackground() { Log.d("TAG", "APP Background") }

}
```

We make the **ForegroundDetector** a **LifecycleObserver** which will listen to events whenever there is a **ON\_START** or **ON\_STOP** event happening. Since in our application class we have registered a ProcessLifecycleOwner it will internally count the open Activities and inform us about the state of the application.

##### Fourth step

The next task is to add an RxJava subject inside the **ForegroundDetector** which we can subscribe to and get the current application state inside our Fragments/Activities.

The new enhanced _ForegroundDetector_ will be like this:

```java
class ForegroundDetector : LifecycleObserver {

    private val subject = PublishSubject.create<Boolean>()
    fun foregroundObservable() = subject

    @OnLifecycleEvent(Lifecycle.Event.ON\_START) 
    fun inForeground() { 
        Log.d("TAG", "APP Foreground") subject.onNext(true) 
    }

    @OnLifecycleEvent(Lifecycle.Event.ON\_STOP) 
    fun inBackground() { 
        Log.d("TAG", "APP Background") subject.onNext(false) 
    }
}
````

> I suggest to wire up the instance of the **ForegroundDetector** with dagger so you can easily provide it and help with the instance management.

##### Fifth and final step

  

Inside an Activity/Fragment we just need to subscribe to the foregroundObservable() which is emitting the application state and notifying us of any change to it.

```java
foregroundDetector
    .foregroundObservable() 
    .subscribeOn(Schedulers.io()) 
    .observeOn(AndroidSchedulers.mainThread()) 
    .subscribe({ Toast.makeText(this, "$it", Toast.LENGTH\_LONG).show() }, {})
```

Lastly don't forget to unsubscribe from the observable when the Fragment/Activity get's destroyed.

##### Sum Up

  

1) Get the lifecycle components 2) Extend the **Application class** and use the **ProcessLifecycleOwner** 3) Create a **ForegroundDetector** class which implements **LifecycleObserver** 4) Create a **PublishSubject** where the application states gets emitted. 5) Activities/Fragments can subscribe to the events and act accordingly

#### Conclusion

That's it! Feel free to check out more stuff on the site about [Android](https://renegens.com). For any suggestions or feedback hit me up on Twitter.
