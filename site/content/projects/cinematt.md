---
title: 			"Cinematt"
description:	"Photography portfolio website."
synopsis:		"This is my personal photography website built using the Hugo static site generator."
github:			"https://github.com/matfin/cinematt"
liveurl:		"https://cinematt.photography"
date:			"2017-06-01"
ongoing:		true
identifier:		"projects"
languages: 		
- Javascript (ES7)
- HTML5
frameworks:
- Hugo
- Sass
infrastructure: 
- Docker
- Linux
- Nginx
- NodeJS
tools:
- Docker Compose
- CircleCI
- Gulp
- Sublime Text
- Adobe Photoshop
- Git
---

## The Brief
I had a trove of photos that I had taken over a large number of years. I wanted to put them on my own website, which would focus on delivering crisp and clear images for all devices.

My preference was to move away from existing image hosting services such as Instagram, Flickr and Facebook. While it is easier to disseminate content on some of these platforms, I wanted to create something what was open and free for everybody to use.

## Project planning and development
I set about creating my own Photography website to fulfill the following requirements:

- Content should load as quickly as possible on all devices. I used the HTML `<picture>` element to deliver responsive images.
- Art direction is important for showing grouped images of different aspect ratios in the best possible way. I wanted to experiment with CSS grid layout, so this was a perfect opportunity for me to try it out.
- I needed somewhere to host and process these images. I opted to use [Cloudinary](https://cloudinary.com) who provide an excellent API for delivering images in multiple sizes.
- I didn't want to have people waiting too long for the page to load. I implemented lazy loading in Javascript to start sequentially loading images once the layout of the page was rendered.
- I wanted to include the metadata for my images. Cloudinary also did an excellent job parsing and delivering this through their API.

**Note:** I have written about my experiences in building this site - see [Building Cinematt](/blog/building-cinematt).

## Challenges encountered
I needed to be able to fetch the image metadata from Cloudinary and format it in such a way that Hugo could pick it up as a content item for each of the 289 photos I had processed. I wrote a little [tool](https://github.com/matfin/cloudinary_to_hugo) to take care of this.

I took on this project to learn more about the CSS grid layout framework. Given that this is a very new technology, it doesn't work in Internet Explorer (nor will it ever). MS Edge support is coming soon and the latest versions of all browsers support the framework.

There has also been some odd CSS behaviour. Safari on iOS crashed when I tried to reveal my responsive nagivation menu. This worked perfectly on all other devices, so I think it could be a bug in the Webkit rendering engine.