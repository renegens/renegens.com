---
title: "lastLocation is null"
date: "2019-03-06"
draft: false
path: "/blog/2019-03-06-lastlocation-is-null"
---

There was a requirement to fetch nearby data by sending the devices latitude and longitude to a rest endpoint. The location itself wasn’t trivial so an approximate location of the city would be good enough for my use case.  

### **tldr:** **Next time you lastLocation is null, check what permission you are asking for.**

After looking around in the Android documentation I decided to use the new Fused Location Provider Google is promoting. That is for devices that have Play Services installed.  

**LocationServices.getFusedLocationProviderClient(context).lastLocation**  

The API would get me a location which the OS has cached when any app has requested the location before which is usually the case with so many apps requiring location data.  

Since I wasn’t looking for an exact location I thought to myself let’s just ask for the COARSE\_LOCATION permission and not the FINE\_LOCATION permission. So I added it to the manifest and setup the required checks to get the location.  

It was working half the time. Half the time there was a location, half the time there wasn’t.  

The first think I thought was that my emulator has problems, so I tried it on an actual device, where it worked again, half the time. My initial assumption was that there could be no apps requesting a location on the system so I would be the first one, hence the null location when requesting the **lastLocation**.  

Creating this whole location listening logic was something I was not keen on doing.  Fire up a request, listen for a location, then stop the updates etc, it was too much work for just one lousy location!  

Maybe something else was wrong. I opened **Google Maps** and then requested the location on the map so it would have a valid location. I opened then my app, but, it the lastLocation was **null** again!  

Frustrated and ready to implement my own location request service so I don’t need to depend on the lastLocation.  

## **_Then it hit me!_**  

I am not sure why I did what I did, but I changed the permission from COARSE to FINE. Since **FINE\_PERMISSION** includes **COARSE\_PERMISSION** I didn’t need to have both inside the manifest file.  

Press run on the device, and voila, I had a location. Even on the emulator. Every time!  

Turns out it makes sense, the vast amount of Android apps use **FINE** location to pinpoint the user which the Play Services will cache. Not many apps create a location request for the **COARSE** location.  

In conclusion I was listening for a lastLocation which was retrieved by the WiFi or cellular provider but not GPS. When this is not available the lastLocation will be null. Although if you ask for **FINE\_PERMISSION** then it will get location data from all of the above sources  

**Here you have it, next time you lastLocation is null, check what permission you are asking for.**

[Check some other Android posts on the blog, I hope they will help.](http://www.renegens.com)
