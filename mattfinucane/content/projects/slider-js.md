---
title: 			"SliderJS"
description:	"Simple content slider."
synopsis:		"A simple content slider written in vanilla Javascript and bundled as a Bower package."
liveurl:		"https://github.com/matfin/slider"
date:			"2015-08-01"
duration:		"30 days"
languages: 		
- Javascript (ES7)
tools:
- BowerJS
- Sublime Text
- XCode
- Github
- JSLint
- AtmosphereJS
---

## SliderJS
This is a package I wrote and used in several of my client side Javascript projects. It offers slide functionality for content inside a carousel.

### The brief
I wanted to create a slider that was lightweight and simple to implement. 

I also wanted it to be responsive, so it would behave itself when the browser window was resized.

### Project planning
There were existing slider modules available, but they all required third party packages such as jQuery so I wanted to see if I could create something neat and fast using Javacript only.

I limited browser support to the latest two versions of each of the main browsers. Maintaining legacy support was not needed, so this would lessen the need for ugly hacks for legacy browsers.

### Project development
I came up with a list of features that needed to be implemented:

- Support the latest two versions of all major browsers.
- Work with very simple html and css and be easy and intuitive to set up.
- Take advantage of the [RAF web api](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) for better performance.
- Fire when certain events take place, such as an animation completing.
- Allow the plugin user to deal with these events.

### Testing and deployment
This plugin was tested on several devices, from an entry level Android phone to an iMac desktop.

The package was recently refactored to use the ES7 Javascript standard. It is available as a [Bower package](https://github.com/matfin/slider).




