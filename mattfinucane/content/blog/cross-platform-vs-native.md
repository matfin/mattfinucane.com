---
title: "Cross-platform vs native"
description: "Discussing cross-platform vs native development."
synopsis: "I talk about why you shouldn't use cross platform Javascript frameworks for mobile application development."
date: "2017-06-08"
author: "Matt Finucane"
identifier: "blog"
sponsored: false
disqus: true
categories:
- Sencha
- iOS
- HTML5
- Phonegap
---

## Introduction
This post discusses my experiences in working with cross-platform Javascript frameworks to develop mobile applications and why doing this is a very bad idea.

I will focus on Sencha Touch in particular, which is what I had used to create three mobile applications for iOS and Android devices back in 2012.

## Cross-platform VS native
The idea behind cross-platform development is that you can create and publish mobile applications for multiple devices while maintaining a single code base.

This stands in contrast to the more traditional native approach to development, where you would need to choose the programming language for the platform you were targeting.

For iOS, Objective C and Swift are used. For Android, Java is used and Windows Mobile uses C# .Net. 

This means that you would need to maintain three separate code bases for each version of a mobile application. 

On paper, you can see the immediate benefits of this as follows:

- No need to hire developers with difference coding disciplines. It's especially hard to find somebody well versed enough in these different languages to be able to maintain an application for different platofrms.
- Most cross-platform frameworks use Javascript which most developers will be familiar with. This lowers the entry barrier and keeps costs down. No more Objective C memory management woes.
- Access to the devices native functionality (GPS, camera, battery) etc all possible with [Phonegap](https://phonegap.com/).
- A large community and plenty of Open-source tools are readily available.

If you take the items above into account, it's a no-brainer to choose a cross platform tool.

## Sencha Touch
The three mobile applications I had worked on all used Sencha Touch, one of these cross-platform Javascript application frameworks.

It works in such a way so that you would build your project using HTML, CSS and Javascript and then bundle it into a neat package that was them imported into XCode or Android studio. 

The Sencha CMD tool would create projects for each of these platforms, which themselves contained a snippet of native code to boot the application inside a webview.

A webview is essentially a scrollable view that renders a webpage full screen. When you navigate to a link from Twitter on your phone, a webview is spawned and the content is shown.

Sencha Touch is an MVC framework that has a vast UI library of widgets that are used to put together an application. This is all backed by its own baked-in data stores, models and view controllers.

The widgets provided by the framework are styles to give them the appearance of a native application.

This is essentially what Sencha Touch does. It loads a web application inside one of these web views and renders it.

## The projects
The three projects I was working on were simple in nature - two news applications and an offline document store with list and detail views. There was no complex media processing required so the requirement of speed and portability trumped performance.

## This is where it gets complicated
While building these three applications, I encountered numerous issues with functionality, performance and codebase maintenance. My overall take-away from this was that Sencha was good for putting together a quick proof of concept, but when building production quality apps it would never compete with native development.

## Performance
Performance issues for HTML5 applications were often discussed at length. This [StackOverflow thread](https://stackoverflow.com/questions/11450370/sencha-touch-2-android-performance) sums things up for Android based devices nicely.

The problem with webviews for iOS and Android (but especially for Android) was that their performance was hobbled when compared to using Safari on iOS or Chrome on Android. 

For Android devices, the webview did not use any hardware acceleration. This would result in slow and choppy UI performance even on high end devices. This was down to the creators of Android and no amount of optimisation could fully address this.

For iOS devices, performance was not as much of an issue provided your applications functionality did not go beyond list and detail views. With that said, the version of Safari that was run in an iOS webview was much slower than the mobile Safari application. A much older version of the Nitro Javascript engine was used.

When you are running a cross platform Javascript application, you are running it atop a deliberately hobbled runtime and then on the phones hardware itself. This is something the operating system vendors have put in place.

## Application functionality
This was another area where we encountered serious problems with cross-platform mobile application development as follows:

- Rotating an Android device would cause the main intent to restart itself. When drilling down into a detail view within an application, you would be returned to the main landing page when rotating the device.
- Tapping on the physical Android back button would exit the application immediately instead of going back one view. As far as the Android runtime was concerned, we had not proceeded beyond the same web view.
- Pinch and zoom functionality was impossible to get right. We had to implement this natively.
- Tapping an external link in one of the news applications would open that link in the same web view, leaving users stranded. We needed to write native code to fix this.
- Persistent storage for a cross platform app would be wiped out if the user cleared the cache in Safari on iOS, rendering the app useless. Bookmarked content in the application would be wiped out.
- Device fragmentation (especially for Android) would mean that certain things would work differently on devices or not at all on others. We needed to write native code to play embedded Youtube videos.

Another issue was with the applications appearing the same on all devices. This is far from ideal because different platforms have their own designs and user interactions. Many Android applications did not have a back button at the top left of the screen, whereas iOS applications did.

## Extra development effort
There was quite a lot of extra work needed to get these applications working, as follows:

- To prevent applications from restarting on Android devices, I needed to force portrait orientation and disable landscape.
- I also needed to intercept taps on the physical Android back button and communicate this back to the Javascript running inside the webview, which would then go back a view in the HTML5 pushState manager.
- I needed to implement a new scrollview for both platforms to handle content where pinch and zoom functionality was required. I also needed to write extra Javascript to bridge functionality between this scrollview, which needed to take the same appearance of the application itself inside the webview.
- I had to write code to intercept taps on external links and load a second webview which would overlay the first.
- For persistent storage, I needed to write a bridge between the cross-platform application and the native storage offered by the device (think CoreData). I needed to do this for iOS and Android.
- I also had to call another intent for Android devices to play embedded media content.

To add to this, if there was ever a new release of the Sencha Touch platform, the code for the application would need quite a bit of effort to make sure things were working correctly as before. This was needed despite the fact we had stuck to best practices and tried to do everything the correctly sanctioned way.

We even got to the stage where the performance in one of our applications was so bad on Android, no amount of tweaks and optimisations could fix things. We ended up having to rewrite it from scratch natively.

## Why go native
Despite its drawbacks at the time, mainly around language complexities, there are still plenty of good reasons to stick to native application development.

- Native application frameworks have been refined over the years giving better performance and stability.
- The testing frameworks are more integrated and much more mature.
- Native application frameworks have less dependencies and overhead. Most of the libraries needed are built in to the platforms.
- Better access to device hardware with mature persistent storage frameworks that handle data migrations much more easily.
- Bigger communities and better documentation makes things more predictable.

## Conclusion
For each of the applications build using Sencha, we ended up having to maintain three code bases as follows:

- The application itself with its HTML5, Javascript and CSS styles. We had to maintain some separate code to deal with the differences between platforms.
- An XCode codebase to test and deploy the iOS version of the app. We used Git submodules to include the application.
- An Android codebase to to do the same as above.

We also had to keep tabs on the version of Cordova we were using and make sure that everything worked with each successive release of iOS and with it, XCode.

We found ourselves in a scenario where we not only had to keep tabs on Sencha releases to make sure everything worked smoothly, but Android and iOS releases. It was a perpetual task of making sure everything still worked.

To address concerns regarding performance, an article was posted entitled [The Making of Fastbook: An HTML5 Love Story](https://www.sencha.com/blog/the-making-of-fastbook-an-html5-love-story/) showing a comparison between the native Facebook application and one written using Sencha. I read through this but felt rather dubious about the whole thing. The comparisons were made on the most modern phones on the market, not the Gingerbread based Android phones that were commonplace in the market. The source code was never made available which would have been very useful at the time. 

The three projects I worked on were released on time, but required long hours to get them to do what we wanted them to. 

The fourth mobile project we took on was slightly more complex and required more functionality - we needed to be able to save news articles (and their images) for offline viewing. We completed this project in the same amount of time (for iOS, Android and Windows Mobile) as it took to complete it for a Sencha project targeting Android and iOS. 

HTML was designed in the beginning as a document markup language. Although it has come a long way since its inception in the early 1990s, it was never designed to compete with native UIs and it will be playing catch up for the foreseeable future. 







