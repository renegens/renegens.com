---
title: "Converting Java Listeners to Observables"
date: "2016-06-01"
draft: false
path: "/blog/2016-06-01-converting-java-listeners-to-observables"
---

ne of the most used Design Patterns are Listeners. If you check the [wikipedia](https://en.wikipedia.org/wiki/Observer_pattern) page you will see that they are categorized as the Observable Pattern. They are heavily used when a change to one object requires changing other objects.

> The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods. It is mainly used to implement distributed event handling systems.

In order to create this Listener in Java somebody has to follow the below four steps as taken from [codepath](https://guides.codepath.com/android/Creating-Custom-Listeners).

1. Define an interface as an event contract with methods that define events and arguments which are relevant event data.
2. Setup a listener member variable and setter in the child object which can be assigned an implementation of the interface.
3. Owner passes in a listener which implements the interface and handles the events from the child object.
4. Trigger events on the defined listener when the object wants to communicate events to it’s owner

In code this would look something like this:

```java
public interface ObjectListener { public void onRefresh(); }

public class ListenToMe {

private ObjectListener listener;

public void HappensWhenEventIsTriggered() { listener.onRefresh(); }

public void setListener (ObjectListener listener) { this.listener = listener; } }

public class MainActivity extends AppCompatActivity {

    @Override 
    public void onCreate(Bundle savedInstanceState) { 
        ListenToMe listenToMe = new ListenToMe(); listenToMe.setListener(new ObjectListener() {
            @Override 
            public void onRefresh() { 
                code to handle refresh 
            } 
        }); 
    } 
}
```

All great, but how can we spice things up with RxJava?

In RxJava we can use the ReplaySubject. As stated in the documentation:

> ReplaySubject emits to any observer all of the items that were emitted by the source Observable(s), regardless of when the observer subscribes.

It comes really close to the ObjectListener I described above. Keep in mind that the ReplaySubject emits all of it’s data to the subscriber regardless of the time they will subscribe.

Let’s imagine we have TodoList class, it holds a list of to Do’s and has a Listener so any object that registers to this will be notified if any changes happens to the list. We will convert the TodoList class to an Observable, so when a new Todo item is added to the list it emits those changes to any subscriber. In order for this to work it needs to be an Observable and also emit items.

Let’s see how the class looks before migration.

```java
public class TodoList {

private TodoListener listener; private List&lt;Todo&gt; TodoList;

public TodoList() { TodoList = new ArrayList&lt;&gt;(); }

public void setListener(TodoListener listener) { this.listener = listener; }

public void add(Todo todo){ TodoList.add(todo); }

//some more methods }
```

We are adding the Typed ReplaySubject and create it with a static creation method as [Effective Java](http://www.amazon.com/Effective-Java-2nd-Joshua-Bloch/dp/0321356683) by Joshua Bloch suggests. With this Subject, Subscribers can subscribe to the TodoList and it will emit ToDo items. Don’t forget, regardless of the time they will subscribe, they will get every item that has already been emitted. Check the comments of the snippet to see what we are adding to make this an Observable.

```java
public class TodoList {

//1. add this ReplaySubject &lt;TodoList&gt; notifier = ReplaySubject.create();

//2. Listener removed private List&lt;Todo&gt; TodoList;

public TodoList() { TodoList = new ArrayList&lt;&gt;(); }

public void add(Todo todo){ TodoList.add(todo); //3. add onNext(); notifier.onNext(this); }

//4. Expose the class as a Observable public Observable &lt;TodoList&gt; asObservable(){ return notifier; }

//some more methods }
```

So far so good, we successfully converted the TodoList to an Observable with no Listeners so we can subscribe to it. Let’s assume that we had implemented the Listener in an adapter. Whenever something would be added to the list, the adapter could update itself. Now we can replace the Listener with an Action1 interface from RxJava, which is simply an interface that has only onNext() and not onSuccess() and onError().

```java
public class MyAdapter implements Action1<TodoList> {

@Override public void onCreate(Bundle savedInstanceState){ //... TodoList data = new TodoList(); }

@Override public void call (TodoList todoList){ data = TodoList; notifyDataSetChanged(); } } 
```

Finally we need to tie everything together and subscribe to the Observable.

```java
public class MyAdapter implements Action1<TodoList> {

@Override public void onCreate(Bundle savedInstanceState){ //... TodoList data = new TodoList();

//Don't forget to subscribe data.asObservable().subscribe(whatIsGonnaSubscribe). }

@Override public void call (TodoList todoList){ data = TodoList; notifyDataSetChanged(); } } 
```

We have seen that with a few changes we can replace the traditional Listener with RxJava. Furthermore we can add operators to the Observable and chain them together.
