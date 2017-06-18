---
title: 			"3Football"
description:	"Cross platform mobile web application."
synopsis:		"The 3Football app provided users with the latest news, match fixtures and a live match tracker for the Republic of Ireland squad taking part in the 2012 European Football Championships."
date:			"2012-04-01"
duration:		"40 days"
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
- Apache Cordova
---

## The brief
This application delivered team news, fixtures and results and live match tracking as well as user submitted content.

Time was of the essence and we needed to create a cross-platform mobile application for iOS and Android devices with the following features:

- A feed of the latest news for the squad.
- A fanzone section with targeted content and offers.
- A live match tracker with minute by minute commentary.

## Project planning and development
We went about building the project with the following:

- [Sencha Touch](https://www.sencha.com/products/touch/), a cross platform Javascript mobile application framework in conjunction with [Apache Cordova](https://cordova.apache.org/).
- [Compass](http://compass-style.org/) was used to compile the SASS stylesheets to CSS.
- Sencha CMD was used to bundle and minifiy the app, preparing it for deployment to the iOS and Android devices.
- Intent listeners were used to handle tapping on external links and videos.
- App content and live match tracking data was pulled from various JSON feeds.

## Difficulties encountered
We encountered the usual difficulties with using a cross-platform Javascript framework for creating a mobile application.

Performance was an issue in some areas, especially when it came to rendering lists of data for the live match tracker.

Tapping on a video did not always mean it played correctly. This was especially apparent on entry level Android devices. We solved this by listening for taps on videos and loading a new intent view that would parse out the video URL and play it using an embedded YouTube video player.

Tapping on links would navigate the user away from the app but leave it running. This would leave the user stranded and they would need to close the app and restart it.


