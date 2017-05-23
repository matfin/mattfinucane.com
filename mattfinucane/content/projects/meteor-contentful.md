---
title: 			"Meteor Contentful"
description:	"Meteor package to connect Meteor and Contentful."
synopsis:		"This is a package I built to synchronise data from Contentful to MeteorJS based single page applications and websites."
liveurl:		"https://atmospherejs.com/matfin/meteor-contentful"
github:			"https://github.com/matfin/meteor-contentful"
date:			"2015-08-01"
duration:		"30 days"
identifier:		"projects"
languages: 		
- Javascript (ES5)
frameworks:
- MeteorJS
infrastructure:
- NodeJS
- MongoDB
tools:
- Sublime Text
- Git
- TravisCI
- AtmosphereJS
- JSLint
- ChaiJS
- Mocha
---

## The brief
Contentful is a web based PaaS that provides content management services along with an API to manage this content.

When I was building several MeteorJS based websites I had the need to make content editing much easier. 

I needed a solution that was easy for non-technical people to work with and modular so I could integrate it into many projects.

I also wanted to be able to easily push changes from their service to my module so the website being edited would receive updates without the need to redeploy.

## Project planning
After researching the options available to me at the time, I opted for Contentful for the following reasons:

- Their system was nice, neat and easy to use for a non technical person. 
- They had impressive image asset management capabilities.
- They had a well documented REST api service that was easy to use.
- They used Markdown for content editing, which was nice and clean and ideal for our use.
- A webhook service was provided to push new changes, negating the need to build an automated sync tool.

When working on a portfolio website, I started to build the basics of a package that would interact with Contentful and keep content in sync.

Once I had this working, I separated out the code and created a standalone package I could then add to other projects.

## Features this package offered
- Content, in the form of entries and assets were fetched and synched on startup.
- Optional functionality to listen to changes from the Contentful webhook facilitated real time content updates.
- Resized images could be generated given a configuration, thus removing the burden to do this on the content author.

## Development, testing and deployment
As this package was being developed, I used the [Ngrok](https://ngrok.com/) HTTP tunneling tool so I could expose my local development machine to Contentful.

Testing was carried out using a combination of [SinonJS](http://sinonjs.org/) for creating stubs and spies, [Chai](http://chaijs.com/) for assertions and [Mocha](https://mochajs.org/) as the test runner.

The package can be found on [Atmosphere](https://atmospherejs.com/matfin/meteor-contentful).


