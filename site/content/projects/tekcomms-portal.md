---
title: 			"Tekcomms Community Portal"
description:	"Engineers portal for Tektronix Communications."
synopsis:		"The Tekcomms Community Portal is a knowlege base for telecomms engineers."
liveurl:		"https://serviceprovider.netscout.com/user"
date:			"2013-09-01"
duration:		"120 days"
identifier:		"projects"
languages: 		
- Javascript
- PHP
- HTML5
frameworks:
- Sass
- jQuery
infrastructure:
- Linux
- Apache
- MySQL
tools:
- Sublime Text
- Git
- Vagrant
---

## The brief
Tekcomms is a software and hardware solutions provider for the telecom industry.

We had to extend the Tekcomms website to provide a password protected community portal and knowlege base for telecomms engineers. 

Upon signing in, an engineer would be presented with a customised list of technical documents for the hardware they were working with.

We also needed to integrate the community portal with third party lead generation tools the organisation was using for their clients.

## Project development
Our tasks for the project were outlined as follows:
 
- Build out the HTML, CSS and Javascript for the given templates, tying them all together using the Drupal view module.
- Build server side hooks that would take new user registration data and push it to the various sales tools being used.
- Use various Drupal modules to filter documents to the correct users with the correct permissions set for their roles.
- Create an automated document import tool that would index and retrieve documents at a timed interval, updating their metadata.

The templates were built using HTML5, with Compass being used as the SASS preprocessor and jQuery used for UI behaviours.

## Difficulties encountered
I have written a blog post detailing my experiences [working with Drupal](/blog/working-with-drupal).
