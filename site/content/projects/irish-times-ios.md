---
title: 			"Irish Times"
description:	"Irish Times news app for iPhone."
synopsis:		"This is the content delivery application for the Irish Times, the paper of record in Ireland."
liveurl:		"https://itunes.apple.com/ie/app/the-irish-times-news/id365544593?mt=8"
date:			"2012-12-01"
duration:		"60 days"
identifier:		"projects"
languages: 		
- Objective C
- Javascript (ES5)
frameworks:
- CoreData
tools:
- XCode
- Adobe Photoshop
---

## The brief
Our job was to rewrite this application from scratch with the following features:

- Display a list of news articles filtered by category.
- Include embeddable image carousels with pinch and zoom functionality.
- Create the article detail view with embedded commenting, with single sign in from social media platforms.
- Allow articles to be saved for offline viewing.
- Impement tracking with Google Analytics for mobile applications.
- Allow users to adjust settings for font size for accessibility.
- Provide a feedback and support mechanisms.

## Project planning and development
Given the issues we had encountered with cross-platform development in the past, we decided to implement this project natively. 

The target platform was any device that could run iOS 4.2 and up and we used [Cocoapods](https://cocoapods.org/) to handle any third party dependencies.

[CoreData](https://developer.apple.com/reference/coredata) was used to store items for offline viewing. User preferences were stored using [NSUserDefaults](https://developer.apple.com/reference/foundation/userdefaults).

Content was delivered as HTML encoded inside a JSON feed. We used a webview to render article content, calculating the size when the content had finished loading so we could place the widgets for an article detail view in the correct place.