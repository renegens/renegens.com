---
title: "Custom fonts everywhere"
date: "2018-04-20"
draft: false
path: "/blog/2018-04-20-custom-fonts-everywhere"
---

Recently we got [custom fonts](https://developer.android.com/guide/topics/ui/look-and-feel/fonts-in-xml) on Android. So an easy to way to change all the fonts is inside the style.xml, for example if the defined font is this

`android:fontFamily="@font/montserrat_medium"`

We would use it like this:

```xml
<style name="TextViewStyle" parent="android:Widget.TextView"> 
    <item name="android:fontFamily">@font/montserrat\_regular</item> 
</style>
```
[Thanks for reading! Check out more posts on the blog if you'd like.](http://www.renegens.com)