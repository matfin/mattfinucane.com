---
title: 			"Novi Chatbot"
description:	"Facebook chat bot delivering news to users."
synopsis:		"Novi is a chat bot that runs on the Facebook Messenger platform and delivers news content to its users on request or at scheduled daily intervals."
liveurl:		"http://www.novibot.de/"
date:			"2017-03-01"
duration:		"40 days"
identifier:		"projects"
languages: 		
- Javascript (ES7)
- HTML5
infrastructure: 
- Docker
- Linux
- Nginx
- NodeJS
- PostgreSQL
tools:
- Docker Compose
- Sublime Text
- Git
- Mocha
- ChaiJS
- JSLint
---

## The brief
I started working on this project a few months after it was started. My job was to test and document the existing code as well as add new features.

The set up came as two projects, one a CMS where content editors could curate custom content and the other was the bot infrastructure which handled user requests and delivered the appropriate responses.

## Project work
The first task undertaken was to get to grips with how the whole set up worked. The best way to accomplish this was to containerise both parts of the project and tie everything together using [Docker Compose](https://docs.docker.com/compose/).

The code in both projects were refactored and the Javascript was rewritten to use the ES7 standard syntax. Modules were refactored to facilitate unit testing.

The tool [JSLint](http://www.jslint.com/) was used to check the code quality.

## Development environment
The Docker containers were set up in the following way:

- The first container ran the chatbot infrastructure using NodeJS.
- The second container ran PostgreSQL database management system.
- The third container ran the CMS also using NodeJS.

A HTTP tunneling service [Ngrok](https://ngrok.com/) was used to connect the Facebook Messenger platform to the local development environment.

## Testing and deployment 
Unit testing was carried out using [SinonJS](http://sinonjs.org/) for creating spies and stubs, with [Chai](http://chaijs.com/) being used as the assertion library. 

[Mocha](https://mochajs.org/) was used as the test runner and coverage reporting was handled by [Istanbul.js](https://istanbul.js.org/).

The project was deployed to the [Heroku Cloud Platform](https://www.heroku.com/).

## Benefits of this
By containerising the applications, we were able to set the project up on a new machine with relative ease and we had more control over what infrastructure each developer was using.

## Difficulties encountered
After containerising the application, we needed to set up Nodemon to poll the running server for changes to files and this made things quite slow. With the latest release of Docker for the Mac, this issue was addressed because changes to the host filesystem could now be picked up inside containers, and nodemon would reload the server without needing to poll for changes in files.

The other major issue encountered was getting Facebook Messenger to communicate with a local development machine. Ngrok handles this beautifully, especially since it can set up tunnels over HTTPS, something that the Facebook Messenger platform requires.