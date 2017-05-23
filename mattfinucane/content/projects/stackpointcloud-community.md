---
title: 			"StackpointCloud Community"
description:	"Kubernetes Community website"
synopsis:		"The StackPointCloud community website serves as a platform for questions, tutorials and conferences. This is the official Kubernetes Community site for the StackPoint.io product which provides a universal control panel for Kubernetes."
liveurl:		"https://stackpointcloud.com/community"
date:			"2017-04-01"
duration:		"120 days"
identifier:		"projects"
languages: 		
- Javascript (ES7)
- HTML5
frameworks:
- PolymerJS
- Sass
- Mongoose
infrastructure:
- NodeJS
- Docker
- Linux
- Nginx
- MongoDB
- Prerender.io
tools: 
- CircleCI
- Docker Compose
- Mocha
- ChaiJS
- Web Component Tester
- Robomongo
- Sublime Text
- Git
- Sketch
- JSLint
---

## The brief
Create a community website that allows users to post questions, add tutorials and events and curate these. 

Users should be able to easily contribute to the site, with administrators reviewing and publishing this content.

The role of a registered user will determine the control they have over content.

## Project planning
For this site, we opted to use the [PolymerJS framwork](https://www.polymer-project.org/) for the front end, and a combination of [Node.js](https://nodejs.org/) and [Mongoose](http://mongoosejs.com/) for the back end.

When we started building this site, we wanted to explore creating individual reusable [web components](https://www.webcomponents.org/) using the [Material Design](https://material.io/guidelines/material-design/introduction.html) spec.

PolymerJS combined the two of these into a simple framework that also included a polyfill to make web components (new at the time) work on older web browsers.

## Development environment
For this project, we used [Docker Compose](https://docs.docker.com/compose/) to set up our containers as follows:

- One container was used to build and serve the PolymerJS client side component, using Nginx and NPM.
- A second container was used to host the NodeJS REST server.
- A third container hosted the database using MongoDB.
- A fourth container hosted the scheduler which periodically refreshed content from third party services.

We used SASS as our CSS preprocessor and compiled it using Node SASS. Builds were put together using [gulp.js](http://gulpjs.com/), which minified and concatenated scripts and CSS.

## Testing and deployment
Server side unit and integration testing was carried out using [Chai](http://chaijs.com/) and [SuperTest](https://Git.com/visionmedia/supertest) respectively, with both using [Mocha](https://mochajs.org/) as the test runner.

We used [Docker Compose](https://docs.docker.com/compose/) to manage development, staging and production environments in combination with Git and CircleCI.

## Benefits of this approach
Working on this project was interesting because it gave us exposure to the new WebComponents standard. Being able to create custom reusable components with their own compartmentalised styles and scripts was very useful.

Docker Compose made setting up the infrastructure for development environments much easier than before. A new developer could get the project set up with far less effort.

## Difficulties encountered
As with any new frameork or tool, if you encountered any issues or needed to figure out how to do something, it was hard to find the answers. The community was small but growing, so trying to work past any major issues required a lot of experimentation, trial and error.

One particular issue was with web browsers that did not support web components natively. The site was very slow to load initially on Firefox and Internet Explorer, because it needed to parse the concatenated scripts and HMTL imports in one go. At the time of development, there was very little written about how to overcome this. 

We did eventually get to the bottom of the issue by refactoring the front end architecture of the site to bundle components into logical groups so that they would be loaded only when they were needed. This resulted in a slight increase in the number of HTTP requests made for the site but it was a reasonable tradeoff to ensure fast loading times.