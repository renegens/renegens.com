---
title: "Retrofit Observable"
date: "2016-05-03"
draft: false
path: "/blog/2016-05-03-retrofit-observable"
---

In a recent talk by Dan Lew at [Droidcon SF](https://youtu.be/QdmkXL7XikQ?t=4m37s), one of his slide mention “Whatever Retrofit is doing”. He was talking about the creation of RxJava Observables.

> Whatever Retrofit is doing.

Retrofit can return a Byte Stream, a List, asynchronous call, Observables etc.

During my first steps to RxJava and Retrofit, every time Retrofit was to return an Observable, I wouldn’t know what to do with it! Retrofit returns the response of an HTTP call which would be mapped to a POJO. When returning an Observable you don’ t get to map anything at all. At first I was struggling to see what is happening there but there is one thing to keep in mind when using Observables.

> You can' t use them in your code

This might be misleading. In Java you have objects that are ready to be used in your code. You are creating

`Something something = new Something();`

Observables are not working like that. You can work with Observables but at some point you have to give them a meaning. Which simply means you need an Observer. The Observer is the guy who will give meaning to what is finally happening to your object. Keep in mind I am using finally here because you can do “stuff” with Observables like zipping, transforming and many more [things](http://reactivex.io/documentation/operators.html) before getting to your Observer.

You will see where this comes in handy later on. I am still exploring RxJava so there will be no fancy examples of operators but let’ s just see how we take a paginated JSON response from Retrofit, combine the Retrofit calls and display them. All asyncronus and all robust. For the examples I will use calls to [themoviedb](https://www.themoviedb.org/documentation/api?language=en).

`//Rx and Rest Interactions compile 'io.reactivex:rxandroid:1.1.0' compile 'io.reactivex:rxjava:1.1.3' compile "com.squareup.retrofit2:adapter-rxjava:$retrofitVersion" compile "com.squareup.retrofit2:retrofit:$retrofitVersion"`

We need to set up Retrofit so we can use RxJava with it. Pay attention that we also need to add a Retrofit adapter. These are all Gradle dependencies we need for RxJava and Retrofit. Below is a Dagger II module with two interceptors added. One for logging and one attaching the API\_KEY to every call.

```java
@Module public class ApiModule {

@Provides public OkHttpClient provideClient() { HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor(); interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

return new OkHttpClient.Builder().addInterceptor(interceptor).addInterceptor(new Interceptor() { @Override public Response intercept(Chain chain) throws IOException { Request request = chain.request(); HttpUrl url = request.url().newBuilder().addQueryParameter( "api\_key", Constants.API\_KEY ).build(); request = request.newBuilder().url(url).build(); return chain.proceed(request); } }).build(); }

@Provides public Retrofit provideRetrofit (String baseURL, OkHttpClient client){ return new Retrofit.Builder() .baseUrl(baseURL) .client(client) .addCallAdapterFactory(RxJavaCallAdapterFactory.create()) .addConverterFactory(GsonConverterFactory.create()) .build(); }

@Provides public MovieApiService provideApiService(){ return provideRetrofit(Constants.BASE\_URL,provideClient()).create(MovieApiService.class); } } 
```

The required interface for Retrofit. This one gets Movies as a Observable.

```java
public interface MovieApiService {

@GET("top\_rated") Observable <TopRated> getTopRatedMovies(@Query("page") Integer page); } 
```

Notice that the results are paginated. Normally we would fire up a couple of calls changing the parameter of the call each time and having to deal with each call separately. If you have 10 calls you can easily end up with repetitive code and a nice callback hell where error handling is nearly impossible. When returning from the call we have each and every time a response object which has an array of results nested. We could write a custom JSON adapter that could deal with that but that means more code! So where I am going with this?

> RxJava to the rescue

RxJava can help you remedy returning multiple calls, do error handling in one place, extract Java objects based on a function and finally make the code simpler to use.

First let’s handle combining the result of the API calls in the same order we fire them up. Here we are using an operator called **concatWith()** which combines the Observables and keeps the order which we feed Observables into it. We then extract the result list and return this as an Observable which can emit result objects.

```java
Observable<TopRated> merged = topRatedMovies.concatWith(topRatedMovies2).concatWith(topRatedMovies3);

Observable <Result> resultObservable = merged.flatMap(new Func1<TopRated, Observable<Result>>() { @Override public Observable<Result> call(TopRated topRated) { return Observable.just(topRated.results); } }); 
```

The operator we are using is [flatMap](http://reactivex.io/documentation/operators/flatmap.html) which the documentation states does:

> The FlatMap operator transforms an Observable by applying a function that you specify to each item emitted by the source Observable, where that function returns an Observable that itself emits items. FlatMap then merges the emissions of these resulting Observables, emitting these merged results as its own sequence.

So in plain English you put in the mix an Observable and a function. The function will be applied to the Observable and will create/emit another Observable on which you can subscribe to. In our case we are sending in an Observable of apply some logic and get back a list of as an Observable.

Lets define what will happen each time a new Observable is emitted.

```java
Observer<Result> observerResults = new Observer<Result>() { @Override public void onCompleted() {

}

@Override 
public void onError(Throwable e) { }

@Override 
public void onNext(Result result) { resultList.add(result); listAdapter.notifyDataSetChanged(); } }; 
```

The Observer interface has three methods. Let’s begin with **onError().** Here you would probably put code that will run when some error will happen, like your network is not reachable or the response is not as expected.

**onCompleted()** will run once when the emission of data has finished. Keep in mind it doesn’ t contain any data. It would be an appropriate place to load a Toast “Data download complete”.

The magic is happening in **onNext()** where the data on each emit is living. Here simple I am adding the items to a list and notify my adapter that we got more.

Finally we must bring them all together and connect the Observable to the Observer.

```javaresultObservable.subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread()).subscribe(observerResults); ```

If be break it down you will see a couple of threading option. In RxJava threading is handled by the framework but you have to specify on what thread this will happen.

**subscribeOn(Schedulers.io())** We want the Observables to live on the io thread so they will not block the UI thread of Android. More about threading [here](http://reactivex.io/documentation/scheduler.html).

**observeOn(AndroidSchedulers.mainThread())** Here we say where we want our final data to be served. We want to populate a ListView which naturally lives on the mainThread so we will observer for the data there.

#### Summing up

We treat anything asynchronous in our code as an Observable. We can apply operators on the Observables, combine Observables, transform them, zip them and a lot more which is provided [here](http://reactivex.io/documentation/operators.html).

After having our final Observable we need to create an Observer which will handle the events the Observable is creating.

Finally a subscription where we couple the Observable with the Observer.

Many thanks to [Alex Styl](https://medium.com/u/5c58e3c0eca2) and [Pavlos-Petros Tournaris](https://medium.com/u/d2295c5f4208) for proofreading the article.
