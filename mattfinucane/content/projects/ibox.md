---
title: 			"iBox"
description:	"Web application for TV set top box interface."
synopsis:		"This is a web application created for iBox.ie, a live streaming TV service provider in Ireland."
liveurl:		"https://ibox.ie/guide/web/epg"
date:			"2012-04-01"
duration:		"60 days"
identifier:		"projects"
languages: 		
- Javascript (ES5)
- HTML5
- C#
frameworks:
- MVC 1.0
- jQuery
infrastructure:
- Microsoft SQL Server
- Microsoft IIS
tools:
- Microsoft Visual Studio
---

## The brief
This is a web application for a TV guide built to run on set top boxes and [HLS](https://developer.apple.com/streaming/) compliant web browsers.

The requirements for this project were as follows:

- Create the interface for a TV set top box that displayed a TV guide to the user.
- Ensure this interface was responsive so it could support display on standard and high definition.
- Track user input via the TV remote control and display streaming HLS content.
- Create the server side infrastructure needed to fetch, transform and deliver TV program data.
- Provide a mechanism for carrying out OTA firmware updates for the box.
- Periodically fetch and cache new TV guide data once every week.

## Project planning and development
The first phase of the project was to get the interface working on the set up box, which was a low powered Linux device with limited RAM and an entry level ARM based CPU.

Performance was key, so function would take precedence over form for now. The box had its own MPEG decoder built in, with support for streaming with HLS (HTTP Live Streaming).

HLS also supports stream switching, so the quality of the stream would be determined by the bandwidth available.

The browser installed on the device was a flavour of Opera mobile and had a limited feature set. 

A subset of CSS2 was used in conjunction with jQuery for DOM manipulation and querying. The HTML was kept as neat and as lightweight as possible. Speedy DOM traversal was key here.

## Difficulties encountered

Given the low hardware spec of the box, the web interface needed to be fast and lightweight. All the HTML and JS code was hand written. No client side JS frameworks were used.

TV guide content was initially rendered server side and delivered along with a JSON payload for the guide that covered two days either side of the current time.

Navigating back and forth along the guide would then fetch and cache the data. We wanted to minimise the number of server requests sent and ensure the device worked smoothly even while offline.







