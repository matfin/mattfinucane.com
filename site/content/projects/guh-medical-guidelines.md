---
title: 			"GUH Medical Guidelines"
description:	"Cross platform mobile web application."
synopsis:		"This is an application containing antimicrobial guidelines for use in hospitals."
liveurl:		"https://itunes.apple.com/ie/app/gapp-guidelines/id659325458"
date:			"2013-03-01"
duration:		"50 days"
identifier:		"projects"
languages: 		
- Javascript (ES5)
- HTML5
frameworks:
- Sencha Touch
- Sass
tools:
- Sublime Text
- XCode
- Android Studio
- Apache Cordova
---

## The brief
This was a cross platform mobile web application for presenting antimicrobial perscription guidelines in a format suitable for phones and tablets.

Before this application was created, staff at the hosptials needed to refer to a large document with a very basic structure to find the information they needed. 

Our job was to refactor this document and present it in a more compact and logical fashion to faciliate access to the information within.

The requirements for this project were as follows:

- Take an existing 100 page Word document and parse the content, maintaining the correct order for sections and subsections.
- Automate the formatting of this content to make it presentable on iOS and Android devices.
- Allow the user to search content and bookmark items of interest.
- Include Gentamycin and Vancomycin dosing calculators.

## Project planning
With those requirements established, we decided to start with the following:

- [Sencha Touch](https://www.sencha.com/products/touch/), a cross platform Javascript mobile application framework in conjunction with [Apache Cordova](https://cordova.apache.org/).
- [Compass](http://compass-style.org/) was used to compile the SASS stylesheets to CSS.
- We created a document parser in C# to convert from Word format to JSON and HTML and strip out unnecessary tags.
- Sencha CMD was used to bundle and minifiy the app, preparing it for deployment to the iOS and Android devices.
- We wrote a customised image viewer natively to allow for pan, pinch and zoom on diagrams.

## Difficulties encountered
We encountered the ususal problems we had experience with cross-platform application development. 

Tapping on an external link within the content would take the user to that website inside the same webview, effectively stranding them outside the app.

Tapping on the physical back button on Android devices would exit the app immediately instead of going back to the previous section. 

Rotating an Android device would restart the webview intent and would put the app back to the landing screen, even if a user was drilled down several sections deep. We solved this by keeping track of where a user was and ensuring that they returned there when the app was restarted for any reason.

Panning and zooming image diagrams was quite sluggish when embedded inside the Sencha app, so we intercepted taps on image content and loaded another customised image view to handle this. 

When bookmarking content rendered in a native view, we had to come up with a way for that to be communicated back to the webview running the Sencha Application.



