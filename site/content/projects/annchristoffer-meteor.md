---
title: 			"Anna Christoffer (Meteor)"
description:	"Portfolio site built using MeteorJS."
synopsis:		"This is the online portfolio for Anna Christoffer, an Art Director based in Berlin."
github:			"https://github.com/matfin/annachristoffer"
liveurl:		"http://annachristoffer.com"
date:			"2015-07-01"
duration:		"40 days"
identifier:		"projects"
languages: 		
- Javascript (ES7)
- HTML5
frameworks:
- MeteorJS
- Less
infrastructure:
- Linux
- Nginx
- Prerender.io
- NodeJS
- MongoDB
tools:
- TravisCI
- Sublime Text
- Adobe Photoshop
- Font Awesome
- Git
- Robomongo
- AtmosphereJS
- ChaiJS
- Mocha
- Velocity
---

## The brief
Build a fast and responsive website focusing on the delivery of clean and crisp images and well formatted typography.

It should be easy to edit content and resize images on the fly with only one updload required to generate several resized images for different devices.

## Project planning and development
This project went through several iterations as it was being build. The first release was built using MeteorJS and stored all content client side (in JSON files).

I decided to rebuild it from scratch with the following setup:

- Content needed to be managed externally. We used [Contentful](https://www.contentful.com/) to manage content and I used my [Meteor Contentful](https://Git.com/matfin/meteor-contentful) module to sync this content to the website.
- SEO for single page websites was a concern. For the first iteration I served pages using PhantomJS to web crawlers, but opted to use the [Prerender.io](https://prerender.io/) service to cache the generated HTML for much better server performance.
- It was important to strike the right balance of image quality and loading speed. I wrote some Javascript to load the most appropriate image given the device screen parameters.
- Client side testing was carried out using the Velocity testing suite.
- Styles were processed using Node SASS.

## Challenges encountered
- Installing PhantomJS on the production server slowed things down considerably and it did not have the same level of support for certain components as a modern browser would. This was replaced with [Prerender.io](https://prerender.io/).
- Given the nature of the site and the number of images it had, we cut down on the initial loading time by loading images that were visible in the viewport.


