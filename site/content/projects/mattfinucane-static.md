---
title: 			"Developer Portfolio Static"
description:	"Portfolio site generated using Hugo."
synopsis:		"This is my personal online portfolio and blog, which contains information on my technical skills and the projects I have worked on."
github:			"https://github.com/matfin/mattfinucane.com"
date:			"2017-04-01"
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
- BowerJS
- Sublime Text
- Adobe Photoshop
- Git
- Font Awesome
---

## The brief
Design and build a site that is fast, responsive and easy to maintain. Minimalism is the key concept here to present key information quickly and allow the reader to drill down for more detail as needed.

The site should load very quickly on all devices given all network conditions. There should not be too many external dependencies that could slow down loading time.

## Project planning
For this site, I opted to use [Hugo](https://gohugo.io), a static site generator for the following reasons:

- Adding inline content as Markdown negates the need for a database setup.
- Serving static html is fast.
- Markdown is easy to work with and content shortcodes facilate more complicated items such as images and scripts.
- GoHugo is a simple and non-opinionated framework and it allows you to serve clean, hand-coded HMTL.
- Static content generated server side is still the easiest for Search Engines to index.

## Development environment
For this project, I used [Docker Compose](https://docs.docker.com/compose/) which stores the project infrastructure in three containers as follows:

- I use one container for GoGuho and this serves up a development version of the site. 
- Another container manages static assets such as CSS and Javascript.
- Finally, another container acts as an Nginx reverse proxy and serves up media assets.

I use Docker Compose for all my web projects now, because it does away with complications involved in setting up infrastructure on different platforms.

CSS and Javasript are managed using the Node SASS plugin, which is the CSS pre-processor framework I am using.

For builds I use the [gulp.js](http://gulpjs.com/) to generate minified and concatenated scripts and stylesheets. This reduces the number of HTTP request made when the site is loaded.

## Deploying changes
[CircleCI](https://circleci.com/) is used in combination with Git to manage deployments. Changes pushed to the `develop` branch will automatically be deployed to a staging server and releases tagged from the `master` branch are deployed to the live server.

The `circle.yml` deployment set up file contains instructions to first build the static assets (css/js), then build the site out using GoHugo. The resulting bundle is copied over to the live server.

## Benefits of this approach
Given the type of website we are builing, serving the files for this website statically is ideal for performance.

Serving over HTTPS using the HTTP/2 protocol speeds things up signigicantly, especially for image assets.

The landing page for the site loads in approximately 3.7 seconds over a simulated Edge connection, a third of the time that was required to load the older version of the site.