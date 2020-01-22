---
title: "Maintain previous value in flatmap"
date: "2018-01-10"
draft: false
path: "/blog/2018-01-10-maintain-previous-value-in-flatmap"
---

With RxJava and chaining operators it is not straightforward how to reuse the previous value of a **flatMap** operation. The usual way to go about this is to use a member variable or instance variable which can temporary store the value we need to keep which is not the best way to solve since we don't want to introduce state inside the functional/reactive approach of RxJava. The developers of RxJava have thought about this and there is an [overloaded method](http://reactivex.io/RxJava/javadoc/rx/Observable.html#flatMap%28rx.functions.Func1,%20rx.functions.Func2%29) of **flatMap **which takes a **Func2** as its 2nd parameter and returns an **Observable** which emits the results of a specified function to the pair of values emitted by the source.

For instance you can use it like this:

\[sourcecode language="java"\] Observable.just("MyObservable") .flatMap({ Observable.just(1)}) { string, number -> Pair(string, number) } .subscribe { (first, second) -> println("Original Value: $first Number: $second") } \[/sourcecode\]
