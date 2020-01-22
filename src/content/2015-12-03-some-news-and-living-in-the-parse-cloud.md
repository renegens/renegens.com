---
title: "Some news and living in the Parse cloud."
date: "2015-12-03"
draft: false
path: "/blog/2015-12-03-some-news-and-living-in-the-parse-cloud"
---

Here we are again after a long break. The reason for the break was I was not keen on writing anything that was particular interesting to me so I can write a new blog post.

One change was the redesign of my [website](http://renegens.com) which is hosting this blog post and moving from a wordpress template to pure HTML hosted on github pages.

Also I got recently into podcasts for Android Developers and I fall in love with [Fragmented](http://www.fragmentedpodcast.com). The hosts are [Donn Felker](http://www.donnfelker.com/about/) and [Kaushik Gopal](http://kaush.co/).

A month ago I came up a problem which might be faced people who are taking care of stray animals and how they can communicate better. So I decided to get this project up and running also for my final thesis at the University. The solution I came up or maybe the folks at Instagram originally is to duplicate the functionality of the Instagram logic. Which means posting pictures with animals and communicating about them in the app. I will not get deeper in the aspect of problem solving or if it could be done otherwise, I will just focus on the technological aspect and what has been used. So I guess this will be more of a multi part series.

I wanted the project to be build on good grounds, what I mean with these, it’s open source on [Github](http://www.github.com/renegens/stray-animals) with a proper license and at the moment a Jenkins CI server is running the build process without testing. Hopefully I will get around this with the upcoming Android Studio 2 and some testing libraries.

Since last year I was eager to make an app that will have a back-end hosted on Parse. I know there are other solutions out there and when talking with fellow developers I was suggested to build it myself or get on Azure. And stubborn as I am I wouldn’t rest until I would try out Parse. So as soon as I needed a proper back-end I turned straight to Parse. My initial experience is rather mixed, at this point The only things that is implemented is a profile page and the login and signup process. But the journey to there wasn’t as straightforward as I thought.

I sat down and began reading the documentation which is quite nice but I think very basic, there are a lot of examples and sometimes I was wondering that’s all you must do? It turns out it’s true in most of the cases. If you want to store something in a user or in any object you just call

`object.put(value,"where in the table")`

and that’s it. You have handy methods like saveinBackground() which can also take callbacks when it’s done. Another useful thing they have is the [ParseUI](https://github.com/ParsePlatform/ParseUI-Android), this is a module which you can use through out your app and it gives you ready made fragments which will handle the logic of login or signup and store’s the values in the cloud. Have I mentioned that it also incorporates a Facebook button and a Twitter button so your user can also sign in with these.

After getting various API keys, generating hash-keys and signing up for developer account I was ready to test what I was doing. To my surprise it was working great. The user could login signup login with Facebook and Twitter. Simply using the provided builder by Parse and calling the ParseBuilder.

`ParseLoginBuilder builder = new ParseLoginBuilder(MyActivity.this); startActivityForResult(builder.build(), 0);`

I will not get in any more details in how to implement this but you can go and read the blog post over at [Parse Blog](http://blog.parse.com/learn/engineering/login-love-for-your-android-app/).

Everything was working great when I started some regression tests and discovered that when the user is in the Login Fragment and pressing back he gets to the underlying Activity which is not that great. I played with various options like **android:noHistory** but nothing was working. I decided to take a look at the modules which I had imported in the app and see something in the source code which could point me in the right direction. I was looking at the code but didn’t find anything wrong or anything that I could add that would help me. Until I decided to read these big green comments on top of the classes. It hit me, the guys at Parse knew that something like these would happen and wrote a explanation how to prevent something like this and how to implement this. In my opinion it should have been on the original blog post. I wasted hours doing something that was already there, so I just had to implement the below code in my entry point of the application.

Activity that starts ParseLoginActivity if the user is not logged in. Otherwise, it starts the subclass-defined target activity. To use this, you should extend ParseLoginDispatchActivity and have in the class:

`@Override protected Class getTargetClass() { return MainActivity.class; }`

This would return the class of the target activity that should be launched after login succeeds. If the user cancels the login, your app will go back to whatever activity it was on before your subclass dispatch activity was launched, or exit the app if your subclass is the first activity in your app’s backstack. You can think of your subclass as a gate keeper for any activities that require a logged-in user to function. You should have one gate keeper per entry path into your app (e.g. launching the app, or entering through push notifications). When your app launches or receives a push notification, you should specify that your gate keeper activity be launched (and the gate keeper will redirect to your target activity upon successful login).

`public class LoginActivity extends ParseLoginDispatchActivity { @Override protected Class> getTargetClass() { return MainActivity.class; } }`

After getting the Login process sorted out, I decided to get some objects into the app, one good candidate was the User.class to encapsulate the data of the user table. I wrote the POJO that would handle the currentUser object and it was working fine, but something wasn’t right. I though the User from parse had already methods implemented so why not extending it. It was not working, so I Googled around but didn’t find any good answer so I decided just to get it in the constructor and doing something like this: `user.ParseUser.getCurrentUser();`

But I wasn’t happy with this, so I started digging again on google just to find out that you can extend the User class and you should just annotate it. `@ParseClassName("_User")`

It wasn’t working again, frustrated I looked at the [issues](https://github.com/ParsePlatform/ParseUI-Android/pull/89). It was a bug, somebody fixed it and luckily it was one line of code that had to be changed finally everything was working great again.

Next challenge was to get the profile pics of the user that are logging in through social media. Gladly there was ParseHelpers available that could get the URL of the public profile picture of the user and feed it to an async task to load it into the cloud. Somebody would ask why not use picasso or any other image library out there. The answer is simple, everything will be on the Parse back-end, and parse provides async methods to download the data except the initial pictures.

Wrapping up the first part, the login and signup is working and getting some default pictures for the user is also working. Next on the list is getting a map in there, take some photos and upload theme.
