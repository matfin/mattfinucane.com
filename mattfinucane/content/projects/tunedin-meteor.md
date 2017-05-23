---
title: 			"TunedIn"
description:	"Web application for TunedIn Media."
synopsis:		"TunedIn was a multi-platform application delivering TV and film content to users in real time."
date:			"2014-04-01"
duration:		"150 days"
identifier:		"projects"
languages: 		
- Javascript (ES5)
- HTML5
frameworks:
- MeteorJS
- Less
- jQuery
infrastructure:
- Linux
- NodeJS
- MongoDB
tools:
- Git
- Sublime Text
- Velocity
- Mocha
- ChaiJS
- JSLint
- Grunt
- Vagrant
---

## The brief
As part of a two person team, I was tasked with creating the TunedIn web application with the following features:

- An interactive TV guide that would allow the users to scrub through a timeline and see what was on TV at that point.
- A detailed program info page with related TV content being displayed alongside the current item.
- A page containing widgets that would allow users to particpate when watching a TV show (polls, multiple choice questions etc).
- Customer registration and sign in flow.

## Project planning
With the above features in mind, it was decided to use the following:

- [Meteor](https://meteor.com) was used as the client side framework given its simplicity and fast rendering.
- Less was used as the CSS preprocessor.
- We needed to separate out the server side and client side components, given Meteor was a full stack framework.
- TV guide and user participation data was fetched from a PHP based REST api.
- [Grunt](https://gruntjs.com/) was used to build and deploy the project, minifying and concatenating everything and handling icon fonts.

## Testing and deployment

The application was unit tested with the [Mocha test runner](https://mochajs.org), with [Sinon](http://sinonjs.org/) used for spies and stubs. 

[Chai](http://chaijs.com/) was used as the assertion library and BDD testing was carried out using Selenium and the [Xolvio testing suite](https://Git.com/xolvio/meteor-cucumber). This provided a cucumber-like syntax for testing the UI in different browsers.

## Difficulties encountered
The one major drawback with using Meteor was that it was designed from the ground up to be a full stack Javascript based framework. Separating the client and server side components proved to be tricky at times.

The other issue was mostly with major updates. Given that Meteor was quite young at this stage, it was in constant flux so even minor updates would break the site and require some time set aside for refactoring.



