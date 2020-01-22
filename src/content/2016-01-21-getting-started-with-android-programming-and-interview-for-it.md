---
title: "Getting started with Android Programming and Interview for it"
date: "2016-01-21"
draft: false
path: "/blog/2016-01-21-getting-started-with-android-programming-and-interview-for-it"
---

Some housekeeping again is mandatory, I will move the posts from my website to medium and just reference them on [renegens.com](http://renegens.com), starting with this one. I felt that there is no reason to maintain a blog with html because github doesn’ t let you host server side code. Although there are some solutions like [jekyll](https://jekyllrb.com/) but I liked the social aspect of medium much more to host my attempts at writing.

#### Purpose

A general guideline where to get resources, some initial steps on how to proceed and try to identify at what stage in your carer your are which in fact troubled me a lot. When applying to jobs you will see just some requirements but what are their exactly, what should a junior developer know, a mid or even a senior developer. These kind of problems are usually faced by self taught android developers which may or may not have a computer science degree. I will not argue if you must have a degree I will just focus on the aspect what you should know. Of course take this all with a grain of salt cause every job description is different and the requirements may differ from country to country and even from position to position and in which business the company is in.

_So is this a guide to ace an interview? No._

_A guide to learn android development? No_

If not all the above, why are you still reading you may ask, well it is a article with a collection of questions and some guidelines at what are some key concepts someone should know before applying for a job as an Android Developer.

#### Do you need Java?

It is obvious that you need to know Java before starting with android. My opinion is that you don’ t need to know every quirks of Java, but you have to know the basics of [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming). A question which may come up in an interview is:

_What are the basics of OOP?_

You can remember it with the mnemonic acronym **A PIE** which stands for _Abstraction, Polymorphism, Inheritance and Encapsulation._ You can find more about that [here](http://beginnersbook.com/2013/03/oops-in-java-encapsulation-inheritance-polymorphism-abstraction/#commentform). Another interesting question is:

_What are the differences between an Abstract class and an Interface in Java?_

The most obvious difference is that the Abstract class can contain methods, member variables and implementations which may or may not be inherited by their subclasses. On the contrary the interface provides only method definitions and their return types. More about this [here](http://stackoverflow.com/questions/761194/interface-vs-abstract-class-general-oo).

To sum up the Java part you can find more common questions and answers at [tutorialpoints.com](http://www.tutorialspoint.com/java/java_interview_questions.htm) .

#### Lets continue with the Android part:

Some companies may ask you to code something, either live in front of the interviewer or at home. The most common task that you need to fulfill is usually:

1. _Make a call to some REST Service_
2. _Download the data to the device_
3. _Display them in a custom ListView / RecyclerView_

You can find some examples of this kind of tasks [here](https://github.com/cooervo/the-movie-DB-android-app) and [here](https://github.com/donnfelker/example-android-challenge).

Apart from the programming task you may be asked some basic Android and Java questions like the below.

1. **Activity/Fragment life cycle / Callbacks / Data Persistence**

The activity and fragment life cycle is well defined and can be found [here](https://dzone.com/articles/visualization-android-activity). Callbacks in a system is when code that runs asynchronous informs some other code when its done or executed.

Data Persistence is achieved in many ways, through shared preferences, SQLite, network calls and Internal storage.

2. **What is a Service? Service Lifecycle. How to make a Service run for as long as required?**

A service is a long running task on a background thread. The thread will run indefenitly and to start it we need to call in on the main activity with serviceStart(). The service should terminate itself cause if not it will run forever. Another way is a bound service which we bine to the activity and it will deliver the result to main thread and it can be also used as worker thread. The catch is that the service or bound will not make a new thread, we must define one, if not provided it will run on the main thread.

3. **What is a Singleton class and where would you use it in Android App Dev and How?**

The Singleton’s purpose is to control object creation, limiting the number of obejcts to one only. Since there is only one Singleton instance, any instance fields of a Singleton will occur only once per class, just like static fields. In android you can use it part of a MVC where the singleton is the controller or in the [Volley library](http://developer.android.com/training/volley/index.html).

4. **What is the difference between List and ArrayList? What is the difference between Set and List?**

List is an interface and ArrayList is an implementation of the List interface. The ArrayList class has only a few methods in addition to the methods available in the List interface. A more detailed guide is available [here](http://www.javabeat.net/difference-between-list-and-arraylist/).

A Set is a collection that contains no duplicate elements.

A List is an ordered collection. The user of this interface has precise control over where in the list each element is inserted. The user can access elements by their integer index (position in the list), and search for elements in the list. For more details check [the stackoverflow post](http://stackoverflow.com/questions/1035008/what-is-the-difference-between-set-and-list).

5. **What is the difference between method overriding and method overloading?**

Method **overloading** deals with the notion of having two or more methods in the same class with the same name but different arguments.

Method **overriding** means having two methods with the same arguments, but different implementations. One of them would exist in the parent class, while another will be in the derived, or child class. The @Override annotation, while not required, can be helpful to enforce proper overriding of a method at compile time. More on this [here](http://stackoverflow.com/questions/12374399/what-is-the-difference-between-method-overloading-and-overriding).

**6\. What is the difference between ListView and RecyclerView?**

The RecyclerView was introduced in Lollipop. It contains many new features like ViewHolder, ItemDecorator, LayoutManager, and SmoothScroller. But one thing that certainly gives it an edge over the ListView is the ability to have animations while adding or removing an item.

The above questions should be well suited for a Junior Developer to answer fairly easy.

#### Next step intermediate developer

Intermediate developers should be familiar with threading, REST Apis, Image Downloading and common error messages. Let’ s see some questions that may come up. I will try to keep the answer short but it is suggested to check the links to explore the topic in detail.

1. **How to implement Multi threading in Android/Java? What is AsyncTask? What are the cons of AsyncTask? What is a Handler?**

There are a lot of libraries available that promise to make everything better and simpler. Let’ s see first how to accomplish this with the default Android behaviour. The famous AsyncTask can help with this, but has some major drawbacks like the ones explained [here](http://blog.danlew.net/2014/06/21/the-hidden-pitfalls-of-asynctask/). Second is the Runnable class from Java but with no direct way to communicate back to the UI. Finally there is the Handler which registers itself with the thread in which it is created. For example, if you create a new instance of the Handlerclass in the onCreate() method of your _activity_, the resulting Handler object can be used to post data to the main thread.

But as [this](http://www.vogella.com/tutorials/AndroidBackgroundProcessing/article.html) post suggest don’ t use any of these. The current trend in Android is to get on the reactive train with [RxJava](https://github.com/ReactiveX/rxjava) and [RxAndroid](https://github.com/ReactiveX/RxAndroid) which is a library developed by Netflix. RxJava is based around the observer pattern and you can find some guides [here](http://blog.danlew.net/2014/09/15/grokking-rxjava-part-1/) and [here](https://github.com/kaushikgopal/RxJava-Android-Samples) about it.

2. **Describe how REST APIs work. What Frameworks/Libraries have you used for networking and REST API calls?**

REST is the acronym for Representational state transfer and is a simple way to organize interactions between independent systems., it is transmitted over HTTP and you can use GET, POST, PUT, DELETE, etc commands. When using a REST API usually you will get a JSON response containing plain data which you can process on the client. In Android we can download these JSON files with an AsyncTask and the JSONReader class.

Although it is far easier to use libraries for this purpose, like [Retrofit](http://square.github.io/retrofit/) from Square which make these calls far easier by binding calls to a Java Interface and converting the underlying data to [POJOs](https://en.wikipedia.org/wiki/Plain_Old_Java_Object).

3. **What Image downloading and caching libraries have you used? What are the pros and cons of that particular library? How would you implement your own module for downloading and caching images?**

There are quit few Image libraries that will do the heavy lifting for you in the background. To mention a few: [Picasso](http://square.github.io/picasso/), [Glide](https://github.com/bumptech/glide), [Volley](http://developer.android.com/training/volley/index.html) and [Universal Image Loader](https://github.com/nostra13/Android-Universal-Image-Loader). You can find at [fragmented podcast](http://fragmentedpodcast.com/category/episodes/page/5/) a whole episode dedicated to this topic and comparison links between them. In the podcast you will find also some ways to deal with bitmaps and how to avoid OutOfMemory Errors.

Disk caching in Android is possible by utilizing LruCache and/or a new library by [Jake Wharton](https://github.com/JakeWharton/DiskLruCache).

The last question is tricky cause you may find yourself in a position where non of the above libraries would be adequate for the job. Personally I get covered by Picasso and Volley together with LruCache and didn’ t need to reinvent the wheel.

4. **What is your experience with Android and SQLite database. Have you used any ORM libraries for Android? What is ContentProvider and how to use them?**

Either you have used SQLite or immediate jumped over to libraries like [Realm](https://realm.io/news/realm-for-android/). My releation to SQL is a Love/Hate one, I was forced to use it, but I never got the hang of it, so Realm is the favorite lib here.

[Content provider](http://developer.android.com/guide/topics/providers/content-providers.html) as taken from android.developer manages access to structured set of data. They encapsulate the data, and provide mechanisms for defining data security. Content providers are the standard interface that connects data in one process with code running in another process.

#### The advanced developer

I am not there yet so I will provide some guidelines of what knowledge you are after.

- RxJava and the Observer Pattern
- Android application development architecture like MVP, MVVM and general clean code architecure
- Dependancy Injection with Dagger II
- UI Testing, Test Driven Development, Espresso etc
- Continuous Integration
- Flavor and build variants in Gradle

#### Conclusion

Fact is there is a ton of knowledge on the web about Android, either podcasts, talks from conferences, blog articles and libraries for every taste. It is easy to get lost out there.
