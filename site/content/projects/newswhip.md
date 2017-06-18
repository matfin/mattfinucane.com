---
title: 			"NewsWhip"
description:	"Cross platform mobile web application."
synopsis:		"The NewsWhip application presents a user with aggregated and categorised content from a selection of news outlets."
date:			"2012-08-01"
duration:		"60 days"
identifier:		"projects"
languages: 		
- Javascript (ES5)
- HTML5
frameworks:
- Sencha Touch
- Sass
tools:
- XCode
- Android Studio
- Sublime Text
- Apache Cordova
---

## The brief
NewsWhip is a news aggregation and analytics platform that tracks articles shared across social media platforms.

My job was to create a cross platform version of the app to be deployed to both iOS and Android devices. 

The app was required to show news articles filtered by location and topic, with the ability to bookmark their favourite topics.

## Project planning and development
For this project, we opted to go with the following set up:

- [Sencha Touch](https://www.sencha.com/products/touch/#overview), a Javascript based mobile application framework was to be used in conjunction with [Apache Cordova](https://cordova.apache.org/).
- [Compass](http://compass-style.org/) was used to compile the SASS stylesheets to CSS.
- Content was fetched from the internal NewsWhip REST api in JSON format.
- Sencha CMD was used to bundle and minifiy the app, preparing it for deployment to the iOS and Android devices.

We used three projects for this with a git submodule set up as follows:

- The Sencha client application which included the stylesheets, Javascript and image assets. We were able to debug this in-browser.
- The XCode project which was an Apache Cordova web view that contained the Sencha Toucn application.
- The Android project that had the same set up with the Apache Cordova plugins.

## Difficulties encountered
Out of the box, Sencha Touch was not built to handle clicking on links to an external website. 

In this case, tapping on a news article would load that article inside the same web view, which would essentially take you away from the application even though it was still running.

We fixed this by intercepting all taps to external links, spawning a new web view to render them. 

We needed to write custom functionality in native code to handle these for both iOS and Android projects.

Performance was also a major issue especially on Android devices (even the Samsung Galaxy S3). 

Scrolling through a list of articles was very choppy and slow and the UI responsiveness was sluggish.

This was down to the fact that the Android web view did not have hardware accelleration enabled and was incredibly slow.

There was no way to overcome this at the time so we needed to rewrite the Android version from scratch natively.
